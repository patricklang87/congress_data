import { configureStore } from '@reduxjs/toolkit';
import searchReducer, {
  loadPotentialSenators,
  removePotentialSenator,
  loadPotentialCongresspeople,
  loadPotentialSubjects,
  removePotentialSubject,
  clearPotentialSubjects,
  updateSearchTerms,
  clearSearchTerms,
  addSubjectSearch,
  removeSubjectSearch,
} from '../redux/searchSlice';

const store = () => configureStore({ reducer: { search: searchReducer } });

describe('searchSlice', () => {
  it('adds search results without duplicating legislators', () => {
    const s = store();
    s.dispatch(loadPotentialSenators([{ id: 'A' }, { id: 'B' }]));
    s.dispatch(loadPotentialSenators([{ id: 'B' }, { id: 'C' }]));
    expect(s.getState().search.senators.map((l) => l.id)).toEqual(['A', 'B', 'C']);

    s.dispatch(removePotentialSenator({ id: 'B' }));
    expect(s.getState().search.senators.map((l) => l.id)).toEqual(['A', 'C']);

    s.dispatch(loadPotentialCongresspeople([{ id: 'R1' }, { id: 'R1' }]));
    expect(s.getState().search.congresspeople).toHaveLength(2); // duplicates within one batch are kept
  });

  it('adds, removes and clears subject results by name', () => {
    const s = store();
    s.dispatch(loadPotentialSubjects([{ name: 'Health' }, { name: 'Energy' }]));
    s.dispatch(loadPotentialSubjects([{ name: 'Health' }]));
    expect(s.getState().search.subjects.map((x) => x.name)).toEqual(['Health', 'Energy']);

    s.dispatch(removePotentialSubject({ name: 'Health' }));
    expect(s.getState().search.subjects.map((x) => x.name)).toEqual(['Energy']);

    s.dispatch(clearPotentialSubjects());
    expect(s.getState().search.subjects).toEqual([]);
  });

  it('updates and clears the name, state and district search fields', () => {
    const s = store();
    s.dispatch(updateSearchTerms({ field: 'name', value: 'Smith' }));
    s.dispatch(updateSearchTerms({ field: 'state', value: 'NC' }));
    s.dispatch(updateSearchTerms({ field: 'district', value: '4' }));
    s.dispatch(updateSearchTerms({ field: 'unknown', value: 'ignored' }));
    expect(s.getState().search).toMatchObject({
      nameSearchTerm: 'Smith',
      stateSearchTerm: 'NC',
      districtSearchTerm: '4',
    });

    s.dispatch(clearSearchTerms());
    expect(s.getState().search).toMatchObject({ nameSearchTerm: '', stateSearchTerm: '', districtSearchTerm: '' });
  });

  it('keeps the most recent subject searches first', () => {
    const s = store();
    s.dispatch(addSubjectSearch('health'));
    s.dispatch(addSubjectSearch('energy'));
    expect(s.getState().search.subjectSearches).toEqual(['energy', 'health']);
    s.dispatch(removeSubjectSearch('health'));
    expect(s.getState().search.subjectSearches).toEqual(['energy']);
  });
});

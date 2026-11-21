import { configureStore } from '@reduxjs/toolkit';
import interestsReducer, {
  addSubject,
  removeSubject,
  trackSenator,
  removeSenator,
  trackCongressperson,
  removeCongressperson,
  loadInterests,
  removeInterests,
} from '../redux/interestsSlice';

const store = () => configureStore({ reducer: { interests: interestsReducer } });

describe('interestsSlice', () => {
  it('tracks and untracks subjects', () => {
    const s = store();
    s.dispatch(addSubject('Health'));
    s.dispatch(addSubject('Energy'));
    s.dispatch(removeSubject('Health'));
    expect(s.getState().interests.subjects).toEqual(['Energy']);
  });

  it('keeps senators and representatives in separate lists', () => {
    const s = store();
    s.dispatch(trackSenator({ id: 'S1' }));
    s.dispatch(trackCongressperson({ id: 'R1' }));
    s.dispatch(trackCongressperson({ id: 'R2' }));
    expect(s.getState().interests.legislators).toEqual({
      senators: [{ id: 'S1' }],
      congresspeople: [{ id: 'R1' }, { id: 'R2' }],
    });

    s.dispatch(removeSenator({ id: 'S1' }));
    s.dispatch(removeCongressperson({ id: 'R1' }));
    expect(s.getState().interests.legislators).toEqual({ senators: [], congresspeople: [{ id: 'R2' }] });
  });

  it("loads a user's saved interests and clears them on logout", () => {
    const s = store();
    const saved = { subjects: ['Health'], legislators: { senators: [{ id: 'S1' }], congresspeople: [] } };
    s.dispatch(loadInterests(saved));
    expect(s.getState().interests).toMatchObject(saved);

    s.dispatch(removeInterests());
    expect(s.getState().interests).toMatchObject({
      subjects: [],
      legislators: { senators: [], congresspeople: [] },
    });
  });
});

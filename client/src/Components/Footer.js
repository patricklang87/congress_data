import React from 'react'

export default function Footer() {
    return (
        <footer>
            <div>
                <p>Photo by <a href="https://unsplash.com/@angelvela?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Louis Velazquez</a> on <a href="https://unsplash.com/s/photos/capitol-building?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
            </div>
            <div>
                <p><i>LegisTracker</i>'s data is sourced from:
                    <br />
                    <a href="https://developers.google.com/civic-information/">Google Civic Information API</a>
                    <br />
                    <a href="https://projects.propublica.org/api-docs/congress-api/">Propublica's Congress API</a>
                    <br />
                    <a href="https://github.com/unitedstates/images">the United State Project on GitHub</a>
                </p>
                <p>A project by <a href="https://patricklang87.github.io/portfolio/">Patrick Lang</a>
                <br />
                &copy; 2021</p>  
            </div>     
        </footer>
    )
}
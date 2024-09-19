document.addEventListener('DOMContentLoaded', function () {
    const claimForm = document.getElementById('claimForm');
    const formStatus = document.getElementById('formStatus');
    const claimsTableBody = document.getElementById('claimsTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    let claims = [];
    let knowledgeBase = [
        { title: 'How to File a Claim', content: 'Follow the steps to file a claim...' },
        { title: 'What is Covered Under Your Policy?', content: 'Your policy covers...' },
        { title: 'How to Check Claim Status', content: 'Go to the "Track Claims" section to view your claim status.' }
    ];

    // Handle form submission
    claimForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const policyNumber = document.getElementById('policyNumber').value;
        const incidentDate = document.getElementById('incidentDate').value;
        const incidentDescription = document.getElementById('incidentDescription').value;

        const claimId = `CLM${claims.length + 1}`;
        const newClaim = {
            claimNumber: claimId,
            status: 'In Review',
            dateSubmitted: new Date().toLocaleDateString(),
            policyNumber,
            incidentDate,
            incidentDescription
        };

        claims.push(newClaim);
        renderClaims();
        formStatus.classList.remove('hidden');
        claimForm.reset();

        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 3000);
    });

    // Render claims in the table
    function renderClaims() {
        claimsTableBody.innerHTML = '';
        claims.forEach(claim => {
            const row = `
                <tr>
                    <td>${claim.claimNumber}</td>
                    <td>${claim.status}</td>
                    <td>${claim.dateSubmitted}</td>
                </tr>
            `;
            claimsTableBody.innerHTML += row;
        });
    }

    // Search the knowledge base
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        const filteredArticles = knowledgeBase.filter(article => 
            article.title.toLowerCase().includes(query) || article.content.toLowerCase().includes(query)
        );

        renderSearchResults(filteredArticles);
    });

    function renderSearchResults(articles) {
        searchResults.innerHTML = '';
        if (articles.length > 0) {
            articles.forEach(article => {
                const li = document.createElement('li');
                li.textContent = article.title;
                searchResults.appendChild(li);
            });
        } else {
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }
});

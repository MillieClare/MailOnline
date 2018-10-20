const repositoryURL = 'https://api.github.com/orgs/nodejs/repos'

function createRepositoriesList(repoList) {
    $(document.body).empty();

    let list = createList(repoList);
    
    $(document.body).append(list);
}

function createList(informationToTest) {
    let list = '<ul>';
    for (let info of informationToTest) {
        list += `<li onclick='getIssues("${info.name}", ${info.id})' id=${info.id}>${info.name}</li>`
    }
    list += '</ul>';
    return list;
}



function getIssues(repoName, htmlID) {
    let issuesURL = `https://api.github.com/repos/nodejs/${repoName}/issues?state=open`;

    let xhr = $.get(issuesURL);

    $('#' + htmlID).children().remove();
    $('#' + htmlID).append('<ul><li>Loading...</li></ul>');

    xhr.fail(() => console.log('$.get on Issues failed'));
    xhr.done(function (issuesList) {
        $('#' + htmlID).children().remove();

        let issues = getIssuesList(issuesList);
        console.log(issues);

        $('#' + htmlID).append(issues);
        $('#' + htmlID).prop('onclick', null).off('click');
    });
}

function getIssuesList(issuesList) {
    let issuesListHTML = '<ul>';
        for (let issue of issuesList) {
            issuesListHTML += `<li>${issue.title}</li>`
        }
        issuesListHTML += '</ul>';
        return issuesListHTML;
}

$(document).ready(function () {

    let xhr = $.get(repositoryURL)
    $(document.body).append('<ul><li>Loading...</li></ul>');
    xhr.fail(() => console.log('Get list of repos failed'));
    xhr.done(function (listRepos) {
        createRepositoriesList(listRepos);
    });

});


let testDataRepositories = [
    { name: 'Millie', id: '1'},
    { name: 'Alex', id: '2'}
]

let testDataIssues = [
    { title: 'Super' },
    { title: 'Awesome'  }
]

let expectedIssues = '<ul><li>Super</li><li>Awesome</li></ul>'
let expectedRepositories = '<ul><li onclick=\'getIssues("Millie", 1)\' id=1>Millie</li><li onclick=\'getIssues("Alex", 2)\' id=2>Alex</li></ul>';
console.log(createList(testDataRepositories) === expectedRepositories);
console.log(getIssuesList(testDataIssues) === expectedIssues);
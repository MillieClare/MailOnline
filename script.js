const repositoryURL = 'https://api.github.com/orgs/nodejs/repos'



function createRepositoriesList(repoList) {
    $(document.body).empty();
    let list = '<ul>';
    for (let repo of repoList) {
        list += `<li onclick='getIssues("${repo.name}", ${repo.id})' id=${repo.id}>${repo.name}</li>`
        console.log(repo);
    }
   list += '</ul>';
   console.log(list);
   $(document.body).append(list);  
}

function getIssues(repoName, htmlID){
    let issuesURL = `https://api.github.com/repos/nodejs/${repoName}/issues?state=open`;

    let xhr = $.get(issuesURL);

    $('#'+htmlID).children().remove();
    $('#'+htmlID).append('<ul><li>Loading...</li></ul>');

    xhr.fail(() => console.log('$.get on Issues failed'));
    xhr.done(function(issuesList){
        $('#'+htmlID).children().remove();
        let issuesListHTML = '<ul>';
        for (let issue of issuesList){
            issuesListHTML += `<li>${issue.title}</li>`
        }
        issuesListHTML += '</ul>';
        $('#'+htmlID).append(issuesListHTML);
        console.log(issuesList);
        $('#'+htmlID).prop('onclick', null).off('click');
    });
}


$(document).ready(function () {

    let xhr = $.get(repositoryURL)
    $(document.body).append('<ul><li>Loading...</li></ul>');
    xhr.fail(() => console.log('Get list of repos failed'));
    xhr.done(function(listRepos){
        console.log(listRepos);
        createRepositoriesList(listRepos);
        console.log(listRepos.length);
    });
   
});


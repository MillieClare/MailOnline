const repositoryURL = 'https://api.github.com/orgs/nodejs/repos'

// take lines 11-15 out into a new function that can be tested by another function.
//Create a mock array (array of 5 objects with name and id properties.)
//Write string which is expected outcome, and then run function to see if it works
//Use same logic & function can be applied to lines 37-41. (Will need to add an additional parameter to take title?)
//Take lines 11-15 out into the new function, and call the new function within createRepositoriesList

function createRepositoriesList(repoList) {
    $(document.body).empty();

    let list = createList(repoList);
  console.log(list);
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
        $('#'+htmlID).prop('onclick', null).off('click');
    });
}


$(document).ready(function () {
    
    let xhr = $.get(repositoryURL)
    $(document.body).append('<ul><li>Loading...</li></ul>');
    xhr.fail(() => console.log('Get list of repos failed'));
    xhr.done(function(listRepos){
        createRepositoriesList(listRepos);
    });
   
});


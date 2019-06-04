function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function newList(listName, listId) {
    let listContentDiv = document.createElement('div');
    let listHeaderDiv = document.createElement('div');
    let headerTextArea = document.createElement('textarea');

    let cardsWrapperDiv = document.createElement('div');
    let cardsWrapperListCardsDiv = document.createElement('div');
    let cardsWrapperListFooterDiv = document.createElement('div');
    listContentDiv.classList.add('list-content');
    listHeaderDiv.classList.add('list-header');
    cardsWrapperDiv.classList.add('cards-wrapper');
    listContentDiv.appendChild(listHeaderDiv);


    return '<div class="list-content" id="lists_' + listId + '">' +
        '            <div class="list-header">' +
        '                <textarea maxlength="256" id="list_title_' + listId + ' data-list="' + listId + '" aria-label="list name" name="list-title" spellcheck="false" class="list-header-name">' + listName + '</textarea>' +
        '            </div>' +
        '        </div>';
}

window.addEventListener('DOMContentLoaded', (event) => {
    let csrf_token = getCookie('csrftoken');

    document.getElementById('add-list-btn').addEventListener('click', () => {
        let data = {
            "name": "Nouvelle liste",
            "project": document.getElementById('add-list-btn').getAttribute('data-project')
        };
        fetch("http://localhost:8000/api/boardAPI/add_task_list/", {
            method: 'POST',
            headers: {
                "X-CSRFToken": csrf_token,
                "Content-Type": "application/json"
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            document.getElementById('list-wrapper').appendChild(newList(data['name'], data['new_list']))
        });
    });

    document.getElementById('project-name').addEventListener('focusout', () => {
        if (document.getElementById('project-name').value !== '') {
            let data = {
                "name": document.getElementById('project-name').value
            };
            fetch("http://localhost:8000/api/boardAPI/" + document.getElementById('project-name').getAttribute('data-project') + "/update_project_title/", {
                method: 'POST',
                headers: {
                    "X-CSRFToken": csrf_token,
                    "Content-Type": "application/json"
                },
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(data)
            }).then((response) => {
                console.log(response);
            });
        }
    });
});


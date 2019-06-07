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

function newTask(taskTitle, taskId, listId) {
    let cardsWrapperListCardsDiv = document.getElementById('tasks_' + listId);
    let card = document.createElement('a');
    let cardDetails = document.createElement('div');
    let cardTitle = document.createElement('span');
    let listCardMembers = document.createElement('div');

    card.setAttribute('data-task', taskId);
    cardTitle.innerText = taskTitle;

    card.classList.add('list-card');
    cardTitle.classList.add('list-card-title');
    cardDetails.classList.add('list-card-details');
    listCardMembers.classList.add('list-card-members');

    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(listCardMembers);
    card.appendChild(cardDetails);
    cardsWrapperListCardsDiv.appendChild(card);

    return card;
}

function newList(csrf_token, listName, listId) {
    // Creation des elements
    let listContentDiv = document.createElement('div');
    let listHeaderDiv = document.createElement('div');
    let headerTextArea = document.createElement('textarea');
    let cardsWrapperDiv = document.createElement('div');
    let cardsWrapperListCardsDiv = document.createElement('div');
    let cardsWrapperListFooterDiv = document.createElement('div');

    let button = document.createElement('div');
    let icon = document.createElement('i');

    // Ajouter les attributs
    cardsWrapperListCardsDiv.setAttribute('id', 'tasks_' + listId);
    headerTextArea.setAttribute('id', 'list_title_' + listId);
    headerTextArea.setAttribute('maxlength', '256');
    headerTextArea.setAttribute('data-list', 'list_' + listId);
    headerTextArea.setAttribute('aria-label', 'list name');
    headerTextArea.setAttribute('spellcheck', 'false');
    headerTextArea.value = listName;
    button.innerHTML = "Nouvelle tâche ";
    button.setAttribute('data-list', listId);
    button.addEventListener('click', () => {
        addNewTaskEvent(listId);
    });

    let sortable = new Sortable(cardsWrapperListCardsDiv, {
        group: 'tasks',
        animation: 150,
        onEnd: (evt) => {
            changeTaskToNewList(csrf_token, evt.item.getAttribute('data-task'), evt.to.getAttribute('data-list'));
        }
    });

    // Ajouter les class
    listContentDiv.classList.add('list-content');
    listHeaderDiv.classList.add('list-header');
    cardsWrapperDiv.classList.add('cards-wrapper');
    headerTextArea.classList.add('list-header-name');
    cardsWrapperListCardsDiv.classList.add('list-cards');
    cardsWrapperListFooterDiv.classList.add('list-footer');

    button.classList.add('add-task-btn');
    icon.classList.add('fas');
    icon.classList.add('fa-plus-circle');

    // Emboitement des elements
    button.appendChild(icon);
    cardsWrapperDiv.appendChild(cardsWrapperListCardsDiv);
    cardsWrapperDiv.appendChild(cardsWrapperListFooterDiv);
    cardsWrapperListFooterDiv.appendChild(button);
    listHeaderDiv.appendChild(headerTextArea);
    listContentDiv.appendChild(listHeaderDiv);
    listContentDiv.appendChild(cardsWrapperDiv);


    return listContentDiv;
}

function addNewTaskEvent(listId) {
    let csrf_token = getCookie('csrftoken');

    let data = {
        "taskList": parseInt(listId),
        "title": "New task",
        "description": 'test',
        "endDate": new Date(),
        "status": "En cours"
    };

    fetch("http://localhost:8000/api/boardAPI/add_new_task/", {
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
        newTask(data['title'], data['new_task'], data['task_list']);
        console.log(data);
    });
}

function changeTaskToNewList(csrf_token, taskId, newList) {
    let data = {
        "newList": parseInt(newList)
    };
    fetch("http://localhost:8000/api/boardAPI/" + taskId + "/change_task_to_other_list/", {
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
        console.log(data);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    let csrf_token = getCookie('csrftoken');

    lists = document.querySelectorAll('div[id^="lists_"]');
    task_list = document.querySelectorAll('div[id^="tasks_"]');
    for (let i = 0; i < lists.length; i++) {
        let list_sortable = new Sortable(lists[i], {
            group: 'lists',
            animation: 150,
            direction: 'horizontal'
        });
    }
    for (let i = 0; i < task_list.length; i++) {
        let tasks_sortable = new Sortable(task_list[i], {
            group: 'tasks',
            animation: 150,
            dataIdAttr: 'data-task',
            onEnd: (evt) => {
                changeTaskToNewList(csrf_token, evt.item.getAttribute('data-task'), evt.to.getAttribute('data-list'));
            }
        });
    }

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
            document.getElementById('list-wrapper').appendChild(newList(csrf_token, data['name'], data['new_list']));
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

    for (let i = 0; i < document.getElementsByClassName('add-task-btn').length; i++) {
        document.getElementsByClassName('add-task-btn')[i].addEventListener('click', () => {
            let listId = document.getElementsByClassName('add-task-btn')[i].getAttribute('data-list');
            addNewTaskEvent(listId);
        });
    }
});


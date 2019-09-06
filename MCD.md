Modèle physique

 git/
  |------- project.json
  |------- backlog/
  |			|------- post-it_1.json
  |			|------- post-it_2.json
  |			+------- post-it_n.json
  |
  |------- sprints/
  |			|------- sprint_1/
  |			|          |------- sprint_1.json
  |			|          |------- post-it_1.json
  |			|          |------- post-it_2.json
  |			|          +------- post-it_n.json
  |			|
  |			|------- sprint_2/
  |			|         |------- sprint_2.json
  |			|         |------- post-it_1.json
  |			|         |------- post-it_2.json
  |			|         +------- post-it_n.json
  |			|
  |			+------- sprint_n/
  |			|         |------- sprint_n.json
  |			          |------- post-it_1.json
  |			          |------- post-it_2.json
  |			          +------- post-it_n.json
  |			 
  +------- sandbox/	
		    |------- post-it_1.json
		    |------- post-it_2.json
		    +------- post-it_n.json

---			

Modèle Conceptuel

Post-it.json : 
{
	"id": string // sha name + sprint
	"name": string,
	"hierarchy": number, // 0 = fonctionnalité/ 1 = tâche / 2 = retour,
	"parent": string, // élément "id" du post-it parent
	
	"estimation": number, // nombre de jour ou 1/2 jour
	"sprint": string, // nom du sprint
	"abandoned": bool, // true si la tâche est abandonnée = sandbox
	"assignee": string, // nom du dev
	"status": number, // 0 = todo/ 1 = in progress/ 2 = done/ 3 = complete
	"active": bool, // true si c'est la tâche sur laquelle on travaille réellement => décompte 
	"duration": number, // temps passé sur la tâche si "active = true" = décompte en minute pour 8h par jour

	"description": long string, // description complète (markdown)
	"comments": [{ "user": string, "comment": string}],
	"attachements": [string]
}

Sprint.json :
{
	"name": string,
	"start": string,
	"end": string,
	"active": bool,
	"length": number // nombre de jours
}

project.json :
{
	"name": string,
	"users": [string]
}







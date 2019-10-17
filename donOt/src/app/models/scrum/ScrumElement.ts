export enum ScrumElementEvent {
  CHANGE = "change",
  DELETE = "delete"
}

export interface ScrumElement {
  id: string // radom sha id
	name: string, // scrum element name
	hierarchy: number, // 0 = fonctionnalité/ 1 = tâche / 2 = retour,
	parent: string, // élément "id" du post-it parent
	estimation: number, // nombre de jour ou 1/2 jour
	duration: number, // temps passé sur la tâche si "active = true" = décompte en minute pour 8h par jour
	sprint: string, // nom du sprint
	abandoned: boolean, // true si la tâche est abandonnée = sandbox
	assignee: string, // nom du dev
	status: number, // 0 = todo/ 1 = in progress/ 2 = done/ 3 = complete
	active: boolean, // true si c'est la tâche sur laquelle on travaille réellement => décompte
	description: string, // description complète (markdown)
	comments: [{ user: string, comment: string, date: string }],
  attachements: [string] // url des fichiers
}

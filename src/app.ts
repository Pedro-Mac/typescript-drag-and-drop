class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!; //2 different ways to do it
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = 'user-input'

    this.titleInputElement = this.formElement.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector('#people')! as HTMLInputElement;

    this.configure();
    this.attach();
  }


  private handleSubmission = (event: Event) => {
    event.preventDefault();

    console.log(this.titleInputElement.value);
  }

  private configure = () => {
    this.formElement.addEventListener('submit', this.handleSubmission);
  }

  private attach = () => {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const project = new ProjectInput();
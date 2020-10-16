//autobind decorator
const autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
  console.log(descriptor);
  const originalMethod = descriptor.value; //the value of the descriptor is the method itself in this case
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    }
  }
  return adjustedDescriptor;
}

//Project input class
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


  // private gatherUserInput(): [string, string, number] {
  //   const enteredTitle = this.titleInputElement.value;
  //   const enteredDecription = this.descriptionInputElement.value;
  //   const enteredPeople = this.peopleInputElement.value;

  //   if(enteredTitle.trim().length === 0 ||
  //     enteredDecription.trim().length === 0 ||
  //     enteredPeople.trim().length === 0) {

  //     }
  // }

  @autobind
  private handleSubmission(event: Event){
    event.preventDefault();
    // const userInput = this.gatherUserInput();
    console.log(this.titleInputElement.value);
  }


  private configure() {
    this.formElement.addEventListener('submit', this.handleSubmission);
  }

  private attach = () => {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const project = new ProjectInput();
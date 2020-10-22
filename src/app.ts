import {validate, Validatable} from './validate'

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


  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDecription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      maxLength: 25
    }
    const descriptionValidatable: Validatable = {
      value: enteredDecription,
      required: true,
      minLength: 5
    }
    const peopleValidatable: Validatable = {
      value: parseFloat(enteredPeople),
      required: true,
      min: 2,
      max: 10
    }

    //Check if any of the function runs returns false
    if(!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
        alert('Your input is invalid!');
        return;
      } else {
        return [enteredTitle, enteredDecription, parseFloat(enteredPeople)];
      } 
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind
  private handleSubmission(event: Event){
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if(Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      this.clearInputs();
    }
  }


  private configure() {
    this.formElement.addEventListener('submit', this.handleSubmission);
  }

  private attach = () => {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const project = new ProjectInput();
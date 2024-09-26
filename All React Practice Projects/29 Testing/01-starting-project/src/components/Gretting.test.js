import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Gretting";

describe('Greeting component', () => {
    test("renders Hello world as a text", () => {
        render(<Greeting />); // Arrange
    
        //Act 
        //....Nothing
    
        //Assert
        const helloWorldElement = screen.getByText('Hello World'); // Check if the text is in the document
    
        expect(helloWorldElement).toBeInTheDocument(); // Check if the text is in the document
    });

    test('renders text is the button is not pressed ', ()=> {
        render(<Greeting />); // Arrange
        const outputText = screen.getByText('Welcome to my first React app');
        expect(outputText).toBeInTheDocument();
    });

    test('renders changed text if button is pressed ', ()=> {
        render(<Greeting />); //Arrange
        //Act
        const buttonElement = screen.getByRole('button')
        userEvent.click(buttonElement)
        const outputText = screen.getByText('Changed', {exact: false});

        expect(outputText).toBeInTheDocument(); // Assert
    });

    test('Initial text must not be present after text change', ()=> {
        render(<Greeting />) //Arrange
        //Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
        //Assertion
        const outputText = screen.queryByText('Welcome to my first React app')
        expect(outputText).toBeNull();
        
    })
});


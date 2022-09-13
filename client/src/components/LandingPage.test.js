import LandingPage from "./Landing-page";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Landing Page test", () => {
    test("renders content", () => {
        let landing = render(<BrowserRouter><LandingPage/></BrowserRouter>);
        expect(landing.container).toHaveTextContent("Its not just another recipe website... its HenryFood");
    });

    test("Lets go Cook! button", ()=>{
        let button = render(<BrowserRouter><LandingPage /></BrowserRouter>);
        expect(button.getByRole("button")).not.toBeDisabled()
    }); 
}); 
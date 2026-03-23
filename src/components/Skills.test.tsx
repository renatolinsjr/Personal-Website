import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { Skills } from "./Skills";
import { dictionaries } from "../dictionaries";

const dict = dictionaries["en-US"];

describe("Skills Component", () => {
  test("renders skills correctly", () => {
    render(<Skills dict={dict} />);
    
    // Check title
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(dict.skills.title);
    
    // Check devops skills
    expect(screen.getByText(dict.skills.devops)).toBeInTheDocument();
    dict.skills.devopsDetails.forEach(skill => {
      expect(screen.getByText(skill, { exact: false })).toBeInTheDocument();
    });
    
    // Check differentials
    expect(screen.getByText(dict.skills.differentials)).toBeInTheDocument();
    dict.skills.differentialsDetails.forEach(skill => {
      expect(screen.getByText(skill, { exact: false })).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { Experience } from "./Experience";
import { dictionaries } from "../dictionaries";

const dict = dictionaries["en-US"];

describe("Experience Component", () => {
  test("renders experience sections correctly", () => {
    render(<Experience dict={dict} />);
    
    // Check main title
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Professional Journey/i);
    
    // Check metrics
    expect(screen.getByText(dict.experience.metrics.users)).toBeInTheDocument();
    expect(screen.getByText(dict.experience.metrics.usersLabel)).toBeInTheDocument();
    expect(screen.getByText(dict.experience.metrics.savings)).toBeInTheDocument();
    expect(screen.getByText(dict.experience.metrics.savingsLabel)).toBeInTheDocument();
    
    // Check roles and companies
    dict.experience.jobs.forEach(job => {
      expect(screen.getByText(job.company)).toBeInTheDocument();
      expect(screen.getByText(job.role)).toBeInTheDocument();
      expect(screen.getByText(job.period)).toBeInTheDocument();
      
      // Check first description of each to ensure it exists
      expect(screen.getByText(job.description[0])).toBeInTheDocument();
    });
  });
});

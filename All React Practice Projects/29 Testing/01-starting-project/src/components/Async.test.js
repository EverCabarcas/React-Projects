import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("Post are rendered correctly", async () => {
    //Arrange
    window.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => {
        return [
          {
            userId: 1,
            id: 1,
            title:
              "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
          {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
          },
        ];
      },
    });
    render(<Async />);
    //Act
    //Assert
    const loadingElement = await screen.findAllByRole("listitem");
    expect(loadingElement).not.toHaveLength(0);
  });
});

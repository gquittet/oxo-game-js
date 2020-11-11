const tiles: NodeListOf<HTMLElement> = document.querySelectorAll(".tile");

const players: string[] = ["X", "O"];

const getPlayerTurn = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

let turn = getPlayerTurn(0, 1);

const changeTurn = (turn: number): number => {
  switch (turn) {
    case 0:
      return 1;
    case 1:
      return 0;
    default:
      throw "Bad turn";
  }
};

const getPlayerLetter = (): string => players[turn] || "";

const getTextFromTile = (tile: HTMLElement): string => {
  const tileContent: Element = Array.from(tile.children)[0];
  if (tileContent) {
    return tileContent.textContent || "";
  }
  return "";
};

const isSameText = (tiles: HTMLElement[]): boolean => {
  const letter = getTextFromTile(tiles[0]);
  return tiles.every(
    (tile) => getTextFromTile(tile) === letter && getTextFromTile(tile) !== ""
  );
};

const isWin = (): boolean => {
  const result = [];

  // Horizontal
  result.push(isSameText([tiles[0], tiles[1], tiles[2]]));
  result.push(isSameText([tiles[3], tiles[4], tiles[5]]));
  result.push(isSameText([tiles[6], tiles[7], tiles[8]]));

  // Vertical
  result.push(isSameText([tiles[0], tiles[3], tiles[6]]));
  result.push(isSameText([tiles[1], tiles[4], tiles[7]]));
  result.push(isSameText([tiles[2], tiles[5], tiles[8]]));

  // Diagonal
  result.push(isSameText([tiles[0], tiles[4], tiles[8]]));
  result.push(isSameText([tiles[2], tiles[4], tiles[6]]));

  return result.some((r) => r);
};

tiles.forEach((tile) => {
  tile.onclick = function () {
    tile.innerHTML += `<span>${getPlayerLetter()}</span>`;
    this.onclick = () => {};
    if (isWin()) {
      alert(`Player ${getPlayerLetter().toUpperCase()} is the WINNER 🎉`);
      document.location.reload();
    }
    turn = changeTurn(turn);
  };
});

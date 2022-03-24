class Board {

  constructor() {
    this.grid = new Array(3).fill(" ").map(() => new Array(3).fill(" "));
  }

  won() {
    return this.horizontal() || this.vertical() || this.diagonal();
  }

  horizontal() {
    for (let i = 0; i < this.grid.length; i++) {
      if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
        return grid[i][0];
      } 
    }
    return false;
  }

  vertical(){
    for (let i = 0; i < this.grid.length; i++) {
      if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
        return grid[0][i];
      }
    }
    return false;
  }

  diagonal(){
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      return grid[0][0];
    }
    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      return grid[0][2];
    }
    return false;
  }

  winner(){

  }

  empty(pos){
    return grid[pos[0]][pos[1]] === " ";
  }

  placemark(pos, mark){
    grid[pos[0]][pos[1]] = mark;
  }

  print() {
    for(i = 0; i < this.grid.length; i++) {
      console.log(this.grid[i].join(" "));
    }
  }

}
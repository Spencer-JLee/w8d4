require("./board.js");

class Game {

  constructor(reader) {
    this.board = new Board();
    this.player1;
    this.player2;
    this.currentPlayer = true;
  }

  currentPlayerMark(){
    if(this.currentPlayer){ return this.player1;}
    else {return this.player2; }
  }

  run(reader, completetionCallback) {
    reader.question('Please select the first mark: ', mark => {
      this.player1 = mark[0];
      this.place(reader);
      reader.question('Please select the second mark: ', mark =>{
        this.player2 = mark[0];
        this.place(reader);
        while (!(this.board.won())){
          this.place(reader);
        }
        console.log(`CONGRATULATIONS ${this.board.won()}`);
        completetionCallback();
      });
    });
  }

  place(reader) {
    reader.question(`Please place your mark (x x): `, pos => {
      pos = [pos[0], pos[2]];
      if (!(this.board.empty(pos))) {
        console.log(`Position is not valid`);
        this.place(reader);
      }
      else {
        this.board.placemark(pos, this.currentPlayerMark());
        this.board.print();
        this.currentPlayer = !this.currentPlayer;
      }
    });
  }


}
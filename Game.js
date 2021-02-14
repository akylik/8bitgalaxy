import Board from "./Board.js";
import DivDrawer from "./DivDrawer.js";

class Game {
  start(div) {
    var b = new Board();
    var s1 = b.star(0,0);
    var s2 = b.star(1,0);
    var s3 = b.star(0,1);
    var s4 = b.star(1,1);
    var s5 = b.star(2,1);
    var s6 = b.star(0,2);
    var s7 = b.star(1,2);
    this.star2(s1);
    this.star3(s2);
    this.star4(s3);
    this.star1(s4);
    this.star3(s5);
    this.star4(s6);
    this.star2(s7);

    var d = new DivDrawer(div);
    d.draw(b);
  }

  star1(s) {
    s.add('Base7C',   0);
    s.add('Base6C',   1);
    s.add('Base5S',   2);
    s.add('Ship1C',   0);
    s.add('Ship2A',   1);
    s.add('Ship3S',   2);
    s.add('Ship4S',   3);
    s.add('Colony4P', 0);
    s.add('Colony3S', 1);
    s.add('Colony6P', 2);
    s.add('Hero2A',   0);
    s.add('Hero2A',   1);
  }

  star2(s) {
    s.add('Base6C',   2);
    s.add('Ship2A',   0);
    s.add('Colony4P', 0);
    s.add('Hero2A',   1);
  }

  star3(s) {
    s.add('Base6C',   2);
    s.add('Colony4P', 0);
  }

  star4(s) {
    s.add('Ship2A',   0);
    s.add('Hero2A',   0);
  }
}

export default Game;

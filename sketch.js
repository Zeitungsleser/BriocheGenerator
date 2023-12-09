let m = 9;
let n = 10;

let out = [];

function sumLine(line) {
  return line
    .map((x) => {
      switch (x) {
        case "v":
          return 1;
        case "w":
          return 2;
        case "l":
        case "r":
          return -1;
        case "s":
          return -2;
        case "|":
          return 0;
        default:
          throw new Error(`${x} is not a valid char`);
      }
    })
    .reduce((a, x) => a + x);
}

function check(line) {
  let valid = true;
  line.forEach((x, i) => {
    if (x == "l" || x == "r") {
      if (!i) valid = false;
      if (line[i - 1] != "|") valid = false;
    }
    if (x == "s") {
      if (i == line.length - 1 || !i) valid = false;
      if (line[i - 1] != "|" || line[i + 1] != "|") valid = false;
    }
  });
  return valid;
}

function setup() {
  createCanvas(400, 400);

  document.getElementById("zeilen").addEventListener("change", (e) => {
    n = Number(e.target.value);
    console.log(n);
    e.target.nextElementSibling.innerText = n;
    redraw();
  });

  document.getElementById("spalten").addEventListener("change", (e) => {
    m = Number(e.target.value);
    console.log(m);
    e.target.nextElementSibling.innerText = m;
    redraw();
  });
}

function draw() {
  noLoop();
  background(220);
  for (let i = 0; i < n; i++) {
    let alle_maschen = [...Array(m).keys()];
    console.log(alle_maschen);
    let l = [];
    while (true) {
      let anz_masch = random(floor(m / 4), floor(m / 3));
      let sel_masch = shuffle(alle_maschen, false).slice(0, anz_masch + 1);
      console.log(sel_masch);
      for (const masche of alle_maschen) {
        let possibilities = ["v", "v", "w", "l", "l", "r", "r", "s"];
        l.push(sel_masch.includes(masche) ? random(possibilities) : "|");
      }
      console.log(l, sumLine(l), check(l));
      if (sumLine(l) == 0 && check(l)) break;
      l = [];
    }

    let x_top = 40;
    let x_bottom = 40;

    for (let j = 0; j < m + 2; j++) {
      let x = 20 + 20 * j;
      let y = 20 + 20 * i;
      point(x, y);

      if (j == 0 || j == m + 1) {
        line(x, y, x, y + 20);
        continue;
      }
      let following_char, last_char;
      try {
        following_char = l[j];
        last_char = l[j - 2];
      } catch (error) {
        following_char = "|";
        last_char = "|";
      }
      if (
        l[j - 1] == "|" &&
        following_char != "r" &&
        following_char != "l" &&
        following_char != "s" &&
        last_char != "s"
      ) {
        line(x_top, y, x_bottom, y + 20);
        x_top += 20;
        x_bottom += 20;
      }
      if (l[j - 1] == "v") {
        line(x_top, y, x_bottom, y + 20);
        x_top += 20;
        line(x_top, y, x_bottom, y + 20);
        x_top += 20;
        x_bottom += 20;
      }
      if (l[j - 1] == "r") {
        line(x_top + (x_bottom - x_top) / 5, y + 4, x_bottom, y + 20);
        x_bottom += 20;
        line(x_top, y, x_bottom, y + 20);
        x_top += 20;
        x_bottom += 20;
      }
      if (l[j - 1] == "l") {
        line(x_top, y, x_bottom, y + 20);
        x_bottom += 20;
        line(x_top + (x_bottom - x_top) / 5, y + 4, x_bottom, y + 20);
        x_top += 20;
        x_bottom += 20;
      }
      if (l[j - 1] == "w") {
        line(x_top, y, x_bottom, y + 20);
        x_top += 20;
        line(x_top, y, x_bottom, y + 20);
        x_top += 20;
        line(x_top, y, x_bottom, y + 20);
        x_top += 20;
        x_bottom += 20;
      }
      if (l[j - 1] == "s") {
        line(x_top + (x_bottom - x_top) / 5, y, x_bottom, y + 20);
        x_bottom += 20;
        line(x_top, y, x_bottom, y + 20);
        x_bottom += 20;
        line(x_top + (x_bottom - x_top) / 5, y, x_bottom, y + 20);
        x_top += 20;
        x_bottom += 20;
      }
    }
  }
}

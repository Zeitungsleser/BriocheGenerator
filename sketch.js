let m = 9;
let n = 10;

let p = 50; //Gittergröße in Pixeln

let out = [];
let seed;

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

function check(line, prevLine = undefined) {
  console.log("Line:", line, "PrevLine:", prevLine);
  let valid = true;
  let s = 0;
  line.forEach((x, i) => {
    if (x == "l" || x == "r") {
      if (!i) valid = false;
      if (line[i - 1] != "|") valid = false;
      s++;
    }
    if (x == "s") {
      if (i == line.length - 1 || !i) valid = false;
      if (line[i - 1] != "|" || line[i + 1] != "|") valid = false;
      s += 2;
    }
    if ((x == "v" || x == "w") && prevLine) {
      let p = prevLine[i + 1 - s];
      if (p == "r" || p == "l" || p == "s") valid = false;
      if (prevLine[i - s] == "s") valid = false;
    }
    if (x == "w" && prevLine) {
      let p = prevLine[i + 2 - s];
      if (p == "r" || p == "l" || p == "s") valid = false;
      if (prevLine[i + 1 - s] == "s") valid = false;
    }
  });
  return valid;
}

function setup() {
  createCanvas(p * (m + 3), p * (n + 2));
  seed = random() * 1e17;

  document.getElementById("zeilen").addEventListener("input", (e) => {
    n = Number(e.target.value);
    e.target.nextElementSibling.innerText = n;
    resizeCanvas(p * (m + 3), p * (n + 2));
  });

  document.getElementById("spalten").addEventListener("input", (e) => {
    m = Number(e.target.value);
    e.target.nextElementSibling.innerText = m;
    resizeCanvas(p * (m + 3), p * (n + 2));
    document.getElementById("anzAnsch").innerText = 2 * m + 3;
    document.getElementById("anzM").innerText = m;
  });

  document.getElementById("seed").addEventListener("input", (e) => {
    seed = Number(e.target.value);
    if (seed == NaN) {
      seed = random() * 1e17;
    }
    redraw();
  });

  document.getElementById("refresh").addEventListener("click", (e) => {
    redraw();
    seed = random() * 1e17;
  });
}

function draw() {
  randomSeed(seed);
  document.getElementById("seed").value = seed;
  noLoop();
  background(220);
  let l;
  for (let i = 0; i < n; i++) {
    let alle_maschen = [...Array(m).keys()];
    //console.log(alle_maschen);
    let prevLine = l;
    l = [];
    while (true) {
      let anz_masch = round(random(floor(m / 4), floor(m / 3)));
      let sel_masch = shuffle(alle_maschen, false).slice(0, anz_masch);
      //console.log(sel_masch);
      for (const masche of alle_maschen) {
        let possibilities = ["v", "v", "w", "l", "l", "r", "r", "s"];
        l.push(sel_masch.includes(masche) ? random(possibilities) : "|");
      }
      //console.log(l, sumLine(l), check(l,prevLine));
      if (sumLine(l) == 0 && check(l, prevLine)) break;
      l = [];
    }
    console.log(l);

    let x_top = 2 * p;
    let x_bottom = 2 * p;

    for (let j = 0; j < m + 2; j++) {
      let x = p + p * j;
      let y = p + p * i;
      point(x, y);

      if (j == 0 || j == m + 1) {
        line(x, y, x, y + p);
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
        line(x_top, y, x_bottom, y + p);
        x_top += p;
        x_bottom += p;
      }
      if (l[j - 1] == "v") {
        line(x_top, y, x_bottom, y + p);
        x_top += p;
        line(x_top, y, x_bottom, y + p);
        x_top += p;
        x_bottom += p;
      }
      if (l[j - 1] == "l") {
        line(x_top + (x_bottom - x_top) / 5, y + p / 5, x_bottom, y + p);
        x_bottom += p;
        line(x_top, y, x_bottom, y + p);
        x_top += p;
        x_bottom += p;
      }
      if (l[j - 1] == "r") {
        line(x_top, y, x_bottom, y + p);
        x_bottom += p;
        line(x_top + (x_bottom - x_top) / 5, y + p / 5, x_bottom, y + p);
        x_top += p;
        x_bottom += p;
      }
      if (l[j - 1] == "w") {
        line(x_top, y, x_bottom, y + p);
        x_top += p;
        line(x_top, y, x_bottom, y + p);
        x_top += p;
        line(x_top, y, x_bottom, y + p);
        x_top += p;
        x_bottom += p;
      }
      if (l[j - 1] == "s") {
        line(x_top + (x_bottom - x_top) / 5, y + p / 5, x_bottom, y + p);
        x_bottom += p;
        line(x_top, y, x_bottom, y + p);
        x_bottom += p;
        line(x_top + (x_bottom - x_top) / 5, y + p / 5, x_bottom, y + p);
        x_top += p;
        x_bottom += p;
      }
    }
  }
}

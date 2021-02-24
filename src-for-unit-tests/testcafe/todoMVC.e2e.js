import { Selector } from "testcafe";

fixture("todoMVC React").page("https://todomvc.com/examples/react/");

/*
 * DOM Element
 * */

const listTodo = Selector(".todo-list");
const counterTodo = Selector(".todo-count");
const btnToggleAll = Selector("label[for='toggle-all']");
const btnAll = Selector(".filters").child("li").nth(0);
const btnActive = Selector(".filters").child("li").nth(1);
const btnCompleted = Selector(".filters").child("li").nth(-1);
const btnClearCompleted = Selector(".clear-completed");

const todoElementIndex = (index) => Selector(listTodo.child("li").nth(index));

test("Add new todo", async (t) => {
  /*
   * Type text Hello World, press Enter
   * Check element class todo-list has label innerText = Hello World
   * Check number todo = 1
   * */

  await t
    .typeText("input.new-todo", "Hello World")
    .pressKey("enter")
    .expect(Selector(".todo-list").find("label").innerText)
    .eql("Hello World");

  await t.expect(listTodo.childElementCount).eql(1);

  await t.expect(counterTodo.child("strong").innerText).eql("1");
});

// test("Click Filter Active", async (t) => {
//   await t.typeText("input.new-todo", "Hello World").pressKey("enter");
//   /*
//    * Check number DOM in todolist > 0
//    * */
//   await t.expect(listTodo().childElementCount).gte(0);
//
//   await t
//     .click(btnActive)
//     .expect(listTodo.find("label").innerText)
//     .eql("Hello World");
// });

test("Click Complete Todo && Click Filter Active", async (t) => {
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      await t
        .typeText("input.new-todo", `Todo ${i}`)
        .pressKey("enter")
        .expect(todoElementIndex(i).find("label").innerText)
        .eql(`Todo ${i}`);
      await t.click(todoElementIndex(i).find("input"));
    } else {
      await t
        .typeText("input.new-todo", `Todo ${i}`)
        .pressKey("enter")
        .expect(todoElementIndex(i).find("label").innerText)
        .eql(`Todo ${i}`);
    }
  }

  await t.click(btnActive).expect(listTodo.childElementCount).eql(2);

  await t.expect(counterTodo.child("strong").innerText).eql("2");
  await t.expect(todoElementIndex(0).find("label").innerText).eql("Todo 1");
  await t.expect(todoElementIndex(1).find("label").innerText).eql("Todo 3");
});

test("Click Complete Todo && Click Filter Completed", async (t) => {
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      await t
        .typeText("input.new-todo", `Todo ${i}`)
        .pressKey("enter")
        .expect(todoElementIndex(i).find("label").innerText)
        .eql(`Todo ${i}`);
      await t.click(todoElementIndex(i).find("input"));
    } else {
      await t
        .typeText("input.new-todo", `Todo ${i}`)
        .pressKey("enter")
        .expect(todoElementIndex(i).find("label").innerText)
        .eql(`Todo ${i}`);
    }
  }

  await t
    .click(btnCompleted)
    .expect(counterTodo.child("strong").innerText)
    .eql("2");

  await t.expect(listTodo.childElementCount).eql(2);
  await t.expect(todoElementIndex(0).find("label").innerText).eql("Todo 0");
  await t.expect(todoElementIndex(1).find("label").innerText).eql("Todo 2");
});

test("Click All Todo", async (t) => {
  for (let index = 0; index < 4; index++) {
    if (index % 2 === 0) {
      await t
        .typeText("input.new-todo", `Todo ${index}`)
        .pressKey("enter")
        .expect(todoElementIndex(index).find("label").innerText)
        .eql(`Todo ${index}`);
      await t.click(todoElementIndex(index).find("input"));
    } else {
      await t
        .typeText("input.new-todo", `Todo ${index}`)
        .pressKey("enter")
        .expect(todoElementIndex(index).find("label").innerText)
        .eql(`Todo ${index}`);
    }
  }
  await t.click(btnAll).expect(counterTodo.child("strong").innerText).eql("2");
  await t.expect(listTodo.childElementCount).eql(4);
});

test("Click Clear Completed", async (t) => {
  for (let i = 0; i < 4; i++) {
    await t
      .typeText("input.new-todo", `Todo ${i}`)
      .pressKey("enter")
      .expect(todoElementIndex(i).find("label").innerText)
      .eql(`Todo ${i}`);
  }

  await t.expect(listTodo.childElementCount).eql(4);
  await t.expect(counterTodo.child("strong").innerText).eql("4");

  await t.click(btnToggleAll);

  await t.expect(counterTodo.child("strong").innerText).eql("0");
  await t.click(btnClearCompleted);
  const main = Selector(".main").exists;
  const footer = Selector(".footer").exists;
  await t.expect(main).notOk().expect(footer).notOk();
});

test("Edit Todo", async (t) => {
  for (let index = 0; index < 4; index++) {
    await t
      .typeText("input.new-todo", `Todo ${index}`)
      .pressKey("enter")
      .expect(todoElementIndex(index).find("label").innerText)
      .eql(`Todo ${index}`);
  }

  await t
    .doubleClick(todoElementIndex(0))
    .pressKey("ctrl+a")
    .pressKey("delete")
    .pressKey("enter");

  await t.expect(listTodo.childElementCount).eql(3);
  await t.expect(counterTodo.child("strong").innerText).eql("3");

  await t
    .doubleClick(todoElementIndex(0))
    .pressKey("backspace")
    .typeText(todoElementIndex(0).find("input.edit"), "ver(1.0)")
    .pressKey("enter")
    .expect(todoElementIndex(0).find("label").innerText)
    .eql("Todo ver(1.0)");
});

test("Remove Todo", async (t) => {
  for (let index = 0; index < 4; index++) {
    await t
      .typeText("input.new-todo", `Todo ${index}`)
      .pressKey("enter")
      .expect(todoElementIndex(index).find("label").innerText)
      .eql(`Todo ${index}`);
  }

  await t
    .hover(todoElementIndex(0))
    .click(todoElementIndex(0).find("button.destroy"))
    .expect(listTodo.childElementCount)
    .eql(3);

  await t
    .hover(todoElementIndex(2))
    .click(todoElementIndex(2).find("button.destroy"))
    .expect(listTodo.childElementCount)
    .eql(2);
});

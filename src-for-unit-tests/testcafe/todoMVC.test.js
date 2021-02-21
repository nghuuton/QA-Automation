import { Selector } from "testcafe";

fixture("todoMVC React").page("https://todomvc.com/examples/react/");

/*
 * DOM Element
 * */

const listTodo = Selector(".todo-list");
const counterTodo = Selector(".todo-count");
const btnToggle = Selector(".toggle");
const btnToggleAll = Selector("label[for='toggle-all']");
const btnActive = Selector("a[data-reactid='.0.2.1.2.0']");
const btnClearCompleted = Selector(".clear-completed");
const btnCompleted = Selector(".filters").child("li").nth(-1);

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

test("Click Filter Active", async (t) => {
  await t.typeText("input.new-todo", "Hello World").pressKey("enter");
  /*
   * Check number DOM in todolist > 0
   * */
  await t.expect(listTodo().childElementCount).gte(0);

  await t
    .click(btnActive)
    .expect(listTodo.find("label").innerText)
    .eql("Hello World");
});

test("Click Complete Todo && Click Filter Active", async (t) => {
  await t
    .typeText("input.new-todo", "Hello World")
    .pressKey("enter")
    .click(btnToggle)
    .click(btnActive);

  await t.expect(listTodo.childElementCount).eql(0);

  await t.expect(counterTodo.child("strong").innerText).eql("0");
});

test("Click Complete Todo && Click Filter Completed", async (t) => {
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      await t.typeText("input.new-todo", `Todo ${i}`).pressKey("enter");
      await t.click(listTodo.child("li").nth(i).find("input"));
    } else {
      await t.typeText("input.new-todo", `Todo ${i}`).pressKey("enter");
    }
  }
  await t
    .click(btnCompleted)
    .expect(counterTodo.child("strong").innerText)
    .eql("2");
  await t.expect(listTodo.childElementCount).eql(2);
  await t
    .expect(listTodo.child("li").nth(0).find("label").innerText)
    .eql("Todo 0");
  await t
    .expect(listTodo.child("li").nth(1).find("label").innerText)
    .eql("Todo 2");
});

test("Click Clear Completed", async (t) => {
  await t.typeText("input.new-todo", "Todo 1").pressKey("enter");
  await t.typeText("input.new-todo", "Todo 2").pressKey("enter");
  await t.typeText("input.new-todo", "Todo 3").pressKey("enter");
  await t.typeText("input.new-todo", "Todo 4").pressKey("enter");

  await t.expect(listTodo.childElementCount).eql(4);
  await t.expect(counterTodo.child("strong").innerText).eql("4");

  await t.click(btnToggleAll);

  await t.expect(counterTodo.child("strong").innerText).eql("0");
  await t.click(btnClearCompleted);
});

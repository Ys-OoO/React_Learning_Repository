# 受控组件和非受控组件

一直以来在开发过程中，对受控和非受控组件的理解都不清晰，导致组件封装时总是没有清晰的逻辑，为此我看了几篇相关文章，感觉大家讲的都不是我想要的。这里十分推荐这篇[卡晨大佬的文章](https://zhuanlan.zhihu.com/p/536322574)，实际上我已经看过很多遍了，却还是似懂非懂。

故而，我决定手敲一遍，果然醍醐灌顶，还得是动手，希望大家在看本文时也手搓一下。

下面将从以下几点逐一讨论：

1. 什么是非受控组件？
2. 什么是受控组件?
3. 重新定义受控和非受控概念！！！
4. 如何封装一个组件，即支持受控模式，又支持非受控模式？

## 什么是非受控组件？

看代码：

```js
export default function UncontrolledSelect() {
  return (
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  );
}
```

是不是觉得什么也没写，就是把 select 放上去了。不错，这就是一个非受控组件，非受控组件的状态是由用户决定，由元素本身保管的，因此你什么也不需要干，当然你可以指定 defaultValue。

那么怎么获取当前的状态呢？

答：使用 `ref` ，如果你想把状态暴露出去，就用 `forwardRef()`，并选择性的搭配`useImperativeHandle`一起使用。

## 什么是受控组件？

看代码：

```js
export default function ControlledSelect({ onChange, value, ...props }) {
  const [selected, setSelected] = useState(value);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    //可以使用onChange props 将数据暴露给外部
    onChange?.(value);
  };
  return (
    <select value={selected} onChange={handleChange} {...props}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  );
}
```

受控组件与非受控组件概念相反，就是状态可以由程序员管理的组件，类似于 Vue 的数据双向绑定（印象中 v-modal 就可以等价为 v-bind+onChange），我们可以控制组件的状态进而控制渲染效果，也可以由用户选择。

上面的代码中可以看到，select 中的 value 是一个由我们管理的 state，当用户选择时触发 onChange 改变了 state 进而渲染了新的值；仔细思考以下，是不是用户做的实际就是修改了 state，而组件的渲染是根据 state 决定的，这就是受控组件的一大特点，state 是唯一数据源；

同样的问题：怎么获取当前状态？

答：组件内部直接使用 state。想要暴露给外面？那需要我们在**所有执行了`setState`的后面调用 `onChange` prop，来将值通过回调的方式传给父组件**

## 重新定义受控和非受控概念！！！

上面我们说受控是组件的状态可以由程序员控制，那么上面这个受控组件可以吗？答案是不完全可以，组件内部可以通过`setState`实现，但是组件外部想要改变这个状态该怎么办呢？ 我尝试使用如下代码进行控制:

```js
const [num, setNum] = useState();
return (
  <>
    <ControlledSelect
      value={num}
      onChange={(v) => {
        setNum(v);
      }}
    />
    <button
      onClick={() => {
        setNum(3);
      }}
    >
      设置num为3
    </button>
  </>
);
```

**BUG**：当点击 button 时，值并没有变化，这是为什么呢？按照正常的逻辑是，我们调用了`setNum`，页面要重新渲染，然后显示出我们设置的 3，但是实际上并没有效果，思考一下这是为什么？

**原因是尽管我们执行了`setNum`，页面重新渲染了，但是组件内部的`selected` 不会重新初始化了，并且也没有任何地方调用了`setSelected`,因此组件内部的 `selected` 状态没有发生变化，于是我进行了如下尝试：**

```js
//1.强制重新挂载
<ControlledSelect
  value={num}
  onChange={(v) => {
    setNum(v);
  }}
  key={Date.now()}
/>
//2.监听value
export default function ControlledSelect({ onChange, value, ...props }) {
  const [selected, setSelected] = useState(value);
  useEffect(()=>{
    setSelected(value);
  },[value]);
  ...
  return (
    ...
  );
}
```

截至到此：我对受控和非受控进行重新定义；接下来所属的受控和非受控将以此作为标准（这里引出的定义实际上跟文章开头提到的卡晨大佬的文章中叙述的差不多）

- **非受控组件：组件自身维护一组状态，可以通过函数 prop 暴露出去，但是外部无法响应式修改(就是之前说的受控组件，特点是没有 value prop)；**
- **受控组件：组件自身维护的状态可以被外部组件修改；（特点是有 value prop）**

上述的两种方法貌似实现了现在我们对受控的定义，但是都不够优雅，一个是在外部使用 key，封装一个组件有这样一个强制要求很不好，另一个是内部使用 useEffect 监听 value，那当外部 value 改变时实际的渲染要慢一个周期，并且可能存在某些奇怪的 bug;

接下来就进入最后一节

## 如何封装一个组件，即支持受控模式，又支持非受控模式？

本节我会使用一个例子来实现一个支持受控和非受控的组件 ColorSelect，类似于单选框，选择的值为 div 的颜色；

![Alt text](image.png)

代码如下，我会逐行进行分析：

```js
export default function ColorSelect({ value, onChange, defaultValue, ...props }) {
  const isControlled = value !== undefined;
  const [selected, setSelected] = useState(isControlled ? value : defaultValue);

  const finalValue = isControlled ? value : selected;
  const handleSelect = (color) => {
    setSelected(color);
    onChange?.(color);
  };

  return (
    <div {...props}>
      {['red', 'green', 'yellow'].map((color) => {
        return (
          <div
            key={color}
            style={{
              height: 20,
              width: 20,
              backgroundColor: color,
              ...(finalValue === color ? { transform: 'scale(1.5)' } : {}),
            }}
            onClick={() => {
              handleSelect(color);
            }}
          ></div>
        );
      })}
    </div>
  );
}
```

1. 首先我们要判断当前属于受控还是非受控模式，重要的标志就是 value 是不是 undefined
   - `const isControlled = value !== undefined;`
2. 之后我们确定组件内部需要维护什么状态
   - 如果是受控模式，那么这个状态应该初始化为 value，如果是非受控模式，那么这个状态应该初始化为 defaultValue 或 undefined
   - `const [selected, setSelected] = useState(isControlled ? value : defaultValue);`
3. 初始化完成后，我们要注意上面提到的 Bug，外部改变数据并不会重新初始化内部的 state 了，但是内部的变量是会重新执行的（可以将 React 中的 state 理解为组件内的一个持久化数据），因此我们将目前的状态汇聚为一个`const`变量；
   - 处于受控模式我们就是用外部的 value，处于非受控模式就使用刚刚初始化的`selected`的值
   - ` const finalValue = isControlled ? value : selected;`
4. 最后就是这些值的使用了：
   - 后面所有需要使用状态的地方我们都统一使用 `finalValue`,因为他是实时更新的
   - 内部所有修改状态的地方都使用 `setState` + `onChange`,这样即可以维护内部 state，同时也会将新值暴露给外部，外部状态的改变还会重新导致 `finalValue` 的更新；

至此，一个支持受控和非受控的 CoverSelect 就实现完成了；

### 如何检验他呢？

- 检验受控模式，直接放到 Antd 的 Form 里面，用用看有没有问题就行
- 检验非受控模式，只传递 onChange 来获取内部的状态

### Hook 转化

将上述的公共逻辑封装为 Hook：

```js
import { useState } from 'react';

export default function useMergedValue({ value, onChange, defaultValue }) {
  const isControlled = value !== undefined;
  const [v, setV] = useState(value ?? defaultValue);
  const finalValue = isControlled ? value : v;

  const update = (newV) => {
    setV(newV);
    onChange?.(newV);
  };
  return [finalValue, update];
}
```

# 总结

我们对受控和非受控进行了重新定义：

- **非受控组件：组件自身维护一组状态，可以通过函数 prop 暴露出去，但是外部无法响应式修改(没有 `value` prop)；**
- **受控组件：组件自身维护的状态是外部传入的，并且会根据改变响应式修改；（有 `value` prop）**

我在学习过程中总是会忽略 React 的 `useState()` 只有在组件实例化时初始化一次，只要组件不重新渲染整个生命周期，那么这个 state 将不会改变，除非调用了 setState；

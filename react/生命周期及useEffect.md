
React函数式组件使用useEffect模拟生命周期
1. React 函数式组件与类组件简介
React 组件是什么？一段可复用的代码片段，能返回页面上渲染的 React 元素。所以不管是类组件还是函数式组件，只是实现方式不同，但最终呈现到页面上的效果是完全一致的！

在介绍 React 函数式组件与类组件之前，思考一下，褪去组件的外壳，函数和类有什么本质的区别？函数无状态，而类有状态！函数只是简单的输入输出，每次相同的输入必定会有相同的输出，符合 FP 的思想，纯粹、简单、易测。

由于类组件基于 OOP 思想，可以使用继承，函数式组件基于 FP 思想，而通常都认为继承的灵活性比较差，组合优于继承，有更好的可维护性、可扩展性、可复用性，而且随着 React Hooks 的出现，函数式组件的能力一点也不逊于类组件，所以 React 官方是推荐使用函数式组件的。

1.1 函数式组件示例
函数式组件是接收一个 props 对象并返回了一个React元素：

/**
 * 函数式组件
 */
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
// 使用组件
const element = <Welcome name="Sara" />;
root.render(element);
1.2 类组件示例
而类组件是通过构造方法设置 props 到当前实例的（构造逻辑可省略）：

/**
 * 类组件
 */
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
// 使用组件
const element = <Welcome name="Sara" />;
root.render(element);
2. React 类组件的生命周期
由于有自身状态的存在，所以生命周期是类组件的最大特色。

构造函数：constructor() 函数中初始化 state
shouldComponentUpdate() 函数，组件确认更新修改，return false 则阻止更新
组件渲染，创建虚拟 DOM：render() - 创建虚拟DOM
挂载（mount）：componentDidMount() 函数
更新（update）：componentDidUpdate() 函数
卸载（unmount）componentWillUnmount() 函数
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

 /**
  * mount 事件
  */
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  /**
  * unmount 事件
  */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
3. React 函数式组件模拟生命周期
既然叫模拟生命周期，就表示实际上函数式组件没有生命周期，这很好理解，一个函数运行完就完了，哪有什么生命周期？

3.1 React Hooks
在 React Hooks 出现之前，React 函数式组件只负责 UI 渲染，没有状态、业务逻辑，是一个纯函数，能力比较弱。React Hooks 的出现为函数式组件提供了状态，使得函数式组件能完全替代类组件的能力。常见的 React Hooks：

useState：为组件提供状态。
useEffect：副作用钩子，说白了就是一段回调函数，在合适的时间被调用。
useCallback：缓存函数。
useMemo：用于缓存函数的返回值。
后两者用于组件性能优化的，不在本篇的范畴。

3.2 useEffect 模拟生命周期的基本用法
3.2.1 组件初始化时，调用一次
模拟类组件 componentDidMount

这里要非常注意，初始化的写法 useEffect 第二个参数一定要传空数组，别传 null，别传 undefined，更不要不传。useEffect 的第二个参数，不传和传空数组，意义完全不一样，待会会介绍不传的用法。

useEffect(() => {
    console.log("init");
}, []);
3.2.2 组件任何 state 变更（包括初始化），都会调用
模拟类组件 componentDidUpdate 和 componentDidMount

useEffect(() => {
    console.log("init or update");
});
3.2.3 组件依赖的 state 发生变更时，每次都会调用
模拟类组件 componentDidUpdate 和 componentDidMount

注意，依赖的 data 最好使用基本类型，不要使用对象。

useEffect(() => {
    console.log("dependence update");
}, [data1, data2]);
3.2.4 组件销毁时，调用一次
模拟类组件 componentWillUnmount。

我理解销毁就是一个嵌套的钩子。

useEffect(() => {
    console.log("init");
    return () => {
        console.log("destroyed");
    }
}, []);
3.3 useEffect 常见使用场景
3.3.1 初始化远程资源
由于组件很可能经常重新加载，对于远程资源，没必要每次加载都重新请求，所以应该放在初始化钩子中。

let resource1 = [];
let resource2 = [];
// ...

useEffect(() => {
    // promise远程调用
    queryResource1().then(result => resource1 = result);
    queryResource2().then(result => resource2 = result);
    // ...
}, []);
3.3.2 配合 useState，异步刷新组件展示的数据
// 下拉框中的数据
const [logisticsProvidersOption, setLogisticsProvidersOption] = useState<{ 'label'?: string, 'value'?: string }[]>([]);

useEffect(() => {
    queryList().then(result => {
        setLogisticsProvidersOption(
            return {
                'label': item.name,
                'value': item.code
            }
        );
    })
}, []);
3.3.3 销毁不受当前组件控制的元素
有些页面元素，我们希望组件销毁时，这些元素也跟着移除，但很遗憾这些元素不受组件控制，所以要手动写销毁逻辑。

useEffect(() => {
    console.log('init')；
    return () => {
        console.log('destroy')；
        const aliTalkMessageBox = document.getElementsByClassName("weblite-iframe");
        for (let i = 0; i < aliTalkMessageBox.length; i++) {
            let item = aliTalkMessageBox[i];
            item.remove();
        }
    }
}, [])
3.4 useEffect 使用注意事项
3.4.1 组件无限循环的问题
useEffect 使用不慎非常容易出现无限循环，例如下面的错误示例一，使用无参的 useEffect，每次组件更新都会触发 useEffect，useEffect 中又更新了 state，造成组件更新，组件更新又触发 useEffect。。。

// 错误示例一
const [data, setData] = useState<string>('');

useEffect(() => {
    // promise远程调用
    queryResult().then(result => {
        setData(result)
    })
});
错误示例二也类似，就不做重复赘述。

// 错误示例二
const [data, setData] = useState<string>('');

useEffect(() => {
    // promise远程调用
    queryResult().then(result => {
        setData(result)
    })
}, [data]);
避免无限循环的使用建议：

useEffect 没有 dependency 参数要慎用！
要非常小心 dependencyList 中的 state 和 effectCallback 中的要修改的 state 不能相同。有时候还会见解的修改掉 state，非常隐蔽。
依赖对象尽量使用 useRef，这样就不会重新加载组件了。
// 初始化数据，作为被依赖的值
let logisticsProviderRef = useRef<API.LogisticsProviderDTO[]>([]);
useEffect(() => {
    queryResult().then(result => {
        logisticsProviderRef.current = result;
    })
}, []);

const [data, setData] = useState<string>('');
useEffect(() => {
    setData(xxx);

// 依赖的是 useRef 对象
}, [logisticsProviderRef.current]);

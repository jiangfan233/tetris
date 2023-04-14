React性能优化“纯自用无脑”准则：
1、越小的组件需要进行更仔细的性能优化;
2、使用自定义比较函数对 React.memo 组件进行深层次比较（React.mome要慎用）;
3、组件中定义的函数一般都用 useCallback 包裹，函数中使用到的 state(s)、setState(s) 都放在依赖项中
4、使用 useMemo 缓存值、缓存组件


使用须知：
1、该项目仅用于学习目的，如有侵权请联系: lostwind233@outlook.com；
2、任何人将此项目代码用于其他用途与创作者本人无关。
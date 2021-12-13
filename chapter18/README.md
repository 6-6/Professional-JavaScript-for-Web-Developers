# 第 18 章 JavaScript 与 XML
什么是XML呢？XML是一种跨平台的，与软、硬件无关的，处理与传输信息的工具。（可以理解为早期的类似JSON数据的传输工具）

XML的设计目标是描述数据并集中于数据的内容。浏览器都内置了对 XML 的原生支持（XML DOM），同时也提供了一系列相关的技术支持。

## 18.1 浏览器对 XML DOM 的支持
浏览器也都实现了各自不同的XML DOM解决方案

### 18.1.1 DOM2 级核心
创建一个空白的 XML 文档：```var xmldom = document.implementation.createDocument(namespaceUri, root, doctype);```

在通过 JavaScript 处理 XML 时，通常只使用参数 root，因为这个参数指定的是 XML DOM 文档元素的标签名。而 namespaceUri 参数则很少用到，原因是在 JavaScrip 中管理命名空间比较困难。最后，doctype 参数用得就更少了。

[创建 XML DOM文档](./18.1/DOMLevel2CoreExample01.html)


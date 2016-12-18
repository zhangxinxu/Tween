Tween.js
================

简介
----------------

各类缓动算法，效果演示参见：http://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html

如何使用参见：http://www.zhangxinxu.com/wordpress/?p=5828

其中animation.js是新增，为了更简单的使用这些缓动算法，语法如下：

<pre>Math.animation(form, to, duration, easing, callback);</pre>

其中：
<code>form</code>和<code>to</code>是必须参数，表示动画起始数值和结束数值；
<code>duration</code>，<code>easing</code>，<code>callback</code>理论上都是可选参数，但是实际上<code>callback</code>肯定是要使用的，因为实时变化的数值就是通过<code>callback</code>返回的。然后，<code>duration</code>，<code>easing</code>，<code>callback</code>这3个参数的顺序是任意的。具体来讲：
<code>duration</code>为动画持续时间，默认<code>300</code>，默认单位是毫秒，建议使用数值，例如<code>600</code>，也支持带单位，例如<code>600ms</code>或者<code>0.6s</code>；
<code>easing</code>为缓动的类型，字符串类型，源自Tween.js，例如：<code>'Linear'</code>，<code>'Quad.easeIn'</code>等等，需要注意大小写。
<code>callback</code>为实时回调函数，支持一个参数，如果正在数值正在变化，则此参数表示当前的数值，如果变化结束，则此参数为<code>false</code>，所以，一旦我们检测到参数值是<code>false</code>就可以判定出动画结束了。


Tween.js
================

简介
----------------

各类缓动算法，效果演示参见：http://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html

如何使用参见：http://www.zhangxinxu.com/wordpress/?p=5828

其中animation.js是新增，为了更简单的使用这些缓动算法，语法如下：

<pre>Math.animation(form, to, duration, easing, callback);</pre>

其中：
<ul>
	<li><code>form</code>和<code>to</code>是必须参数，表示动画起始数值和结束数值；</li>
	<li><code>duration</code>，<code>easing</code>，<code>callback</code>理论上都是可选参数，但是实际上<code>callback</code>肯定是要使用的，因为实时变化的数值就是通过<code>callback</code>返回的。然后，<code>duration</code>，<code>easing</code>，<code>callback</code>这3个参数的顺序是任意的。具体来讲：
<ul>
	<li><code>duration</code>为动画持续时间，默认<code>300</code>，默认单位是毫秒，建议使用数值，例如<code>600</code>，也支持带单位，例如<code>600ms</code>或者<code>0.6s</code>；</li>
	<li><code>easing</code>为缓动的类型，字符串类型，源自Tween.js。例如：<code>'Linear'</code>，<code>'Quad.easeIn'</code>，<code>'Bounce.easeInOut'</code>等等，需要注意大小写。 其中，默认值是<code>'Linear'</code>；</li>
	<li><code>callback</code>为回调函数，支持2个参数（value, isEnding），其中<code>value</code>表示实时变化的计算值，<code>isEnding</code>是布尔值，表示动画是否完全停止。</li>
</ul>
</li>
</ul>

<code>Math.animation</code>返回一个函数，执行这个函数可以返回当前动画使用的请求动画帧，使用<code>cancelAnimationFrame</code>方法可以停止我们的动画。

例如：
<pre>var fnReq = Math.animation(100, 200, 3000);
// 执行下面语句停止动画
cancelAnimationFrame(fnReq());</pre>

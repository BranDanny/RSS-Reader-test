/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */

        var sameDetection = function (n) {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].n).toBeDefined();
                expect(allFeeds[i].n).not.toBe("");
            }
        };

        it('Feeds URL are defined and not empty', function() {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            }
            //sameDetection(url);
        });

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('Feeds name are defined and not empty', function() {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
            }
            //sameDetection(name);
        });

    });

    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu', function() {

        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         * 匹配body是否含有menu-hidden类
         */
        it('menu is hidden default', function() {
            expect($('body').attr("class")).toMatch(/menu-hidden/);
        });

         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ： 当点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */
        it('click icon switch the menu', function () {
            $('.menu-icon-link').click();
            expect($('.menu-hidden').length).toBe(0);
            $('.menu-icon-link').click();
            expect($('.menu-hidden').length).toBe(1);

        })

    });
    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries', function () {

        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
        //beforeEach(function (done) {
        //    loadFeed(0, function () {
        //        done();
        //    })
        //});
//        我们来梳理一下两者的执行过程，分析出为什么可以进行简化：
//
//loadFeed(0, function() {
//    done();
//}); // 简化前
//        上面的函数其实就是在调用 js——>app.js 中的 loadFeed 函数，该函数接收两个参数，一个是数字类型，一个是函数类型。忽略掉函数内部其他逻辑代码，专注于第二个参数的调用，可以写出如下的伪代码：
//
//function loadFeed(id, cb) {
//    cb = function() {
//        done();
//    } // 参数cb就等于我们的在开头传递的第二个参数：匿名函数。
//
//    cb(); // 调用函数。此时执行 cb ，本质上就是在执行 feedreader.js 中 beforeEach 的可选参数 `done`，即 cb() == done() . 当done函数被调用，表明异步操作的回调函数调用成功.
//}
//        loadFeed(0, done); // 简化后
//        简化后的伪代码：
//
//function loadFeed(id, cb) {
//    cb = done;
//    cb(); // 看出效果没有呢？ 此时的cb就是 beforeEach 中传递的 done 函数，调用 cb 就等同于 调用 done
//}
//        上面两者的区别就在于，省去了外层匿名函数 function(){...} 的包装，而这层包装是可以省略的，对执行效果没有影响，所以我们可以对其进行简化。
        beforeEach(function (done) {
            loadFeed(0, done)
        });


        it('loadFeed worked', function (done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        })
    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */

        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         */
    describe('New Feed Selection', function () {
        var feed0 = $('.feed').text();
            beforeEach(function (done) {
                loadFeed(0, function () {
                    loadFeed(1, done)
                })
            });

            it('load new source will be different', function (done) {
                expect($('.feed').text() != feed0).toBe(true);
                done();
            })
    })
}());

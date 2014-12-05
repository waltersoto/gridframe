/*
The MIT License (MIT)

Copyright (c) 2014 Walter M. Soto Reyes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function ($, qA) {

    var PAGING = 'grid-paging',
        UNDEFINED = 'undefined',
        DATA_SOURCE = 'grid-data-source';

    var grid = {
        source: {},
        current: 1,
        size: 5,
        bind: function (data) {

            if (typeof data !== UNDEFINED) {
                this.source[DATA_SOURCE] = data;
            }

            var pg = qA(this.source[DATA_SOURCE]).page(this.current, this.size).toArray();

            $.binder.sources[DATA_SOURCE] = pg;
            $.binder.apply();

            this.paging();
        },

        page: function (pg) {
            this.current = pg;
            this.bind();
        },

        paging: function () {

            var total = Math.ceil(this.source[DATA_SOURCE].length / this.size);

            $(PAGING).removeChildren();

            for (var i = 0; i < total; i++) {
                var p = i + 1;
                if (p == this.current) {
                    var nolink = document.createElement('span');
                    $(nolink).text(p);
                    $(PAGING).appendChild(nolink)
                    .appendChild(document.createTextNode(' '));
                } else {
                    var a = document.createElement('a');
                    a.innerHTML = p;
                    a.href = '#';
                    (function (pg) {
                        $(a).onClick(function () {
                            grid.page(pg);
                        });
                    })(p);

                    $(PAGING).appendChild(a)
                    .appendChild(document.createTextNode(' '));
                }

            }

        }

    };
     
    if (!window.datagrid) {
        window.datagrid = grid;
    }

})(smalljs,qA);
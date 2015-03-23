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

    

    var gridO = function (data, settings) {

        var self = this;

        var pagingSection = "grid-paging",
            dataSource = "grid-data-source";

        var source =  {};

        var current = 1;
        var size = 5;

        if (typeof data !== "undefined" && data !== null) {
            source = data;
        }

        if (settings !== null && typeof settings !== "undefined") {
             
            if (settings.hasOwnProperty("size")) {
                size = settings.size;
            }

            if (settings.hasOwnProperty("paging")) {
                pagingSection = settings.paging;
            }

            if (settings.hasOwnProperty("dataSource")) {
                dataSource = settings.dataSource;
            }

        }


        this.bind = function() {
        
            var pg = qA(source).page(current, size).toArray();

            $.binder.sources[dataSource] = pg;
            $.binder.apply();

            self.paging();
        };

       this.page = function(pg) {
            current = pg;
           self.bind();
       };

        
        this.paging = function() {

            var total = Math.ceil(source.length / size);

            $(pagingSection).removeChildren();

            for (var i = 0; i < total; i++) {
                var p = i + 1;
                if (p === current) {
                    var nolink = document.createElement("span");
                    $(nolink).text(p);
                    $(pagingSection).appendChild(nolink)
                    .appendChild(document.createTextNode(" "));
                } else {
                    var a = document.createElement("a");
                    a.innerHTML = p;
                    a.href = "#";
                    (function (pg) {
                        $(a).onClick(function () {
                            self.page(pg);
                        });
                    })(p);

                    $(pagingSection).appendChild(a)
                    .appendChild(document.createTextNode(" "));
                }

            }

        };

    };


    var grid = function (data, settings) {
        ///	<summary>
        ///	Create a dataGrid
        ///	</summary>
        ///	<param name="data" type="array">
        ///	JSON data array. example: [{"field1":"data"},{"field2":"data"}]
        ///	</param>
        ///	<param name="settings" type="JSON">
        ///	settings = { 
        ///               size:5,
        ///               paging:'paging-div',
        ///               dataSource:'data source attribute name'  
        ///            }
        ///	</param>
        return new gridO(data,settings);

    };
     
    if (!window.grid) {
        window.grid = grid;
    }

})(smalljs,qA);
$(function() {
    "use strict";

    // add class for C# syntax highlighting
    $(".language-c\\# .highlight").removeClass("highlight").addClass("cshighlight");

    // Markdown isn't parsed inside a <section> tag. As a hack, wrap any section.anchor tags around the next section.
    $("section.anchor").each(function() {
        var section = $(this);

        // get header
        var header = section.next("h1, h2, h3, h4, h5");
        if (!header.length)
            return;
        var headerTagName = header.get(0).tagName;

        // get contents within section
        var contents = header.nextUntil(function() { var element = $(this); return element.is("section") || (element.is("h1, h2, h3, h4, h5") && element.get(0).tagName <= headerTagName); }); // everything up to the next equal or higher header

        // wrap content into section
        // don't put header in section to avoid breaking TOC
        section.insertAfter(header);
        section.append(contents);
    });
});

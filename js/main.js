/**
 * These scripts are run when the DOM body is loaded, but before the DOM is done loading.
 */
(function() {
    "use strict";

    /*********
    ** Initialisation scripts
    *********/
    /**
     * Adjust elements to support C# syntax highlighting using a separate syntax highlighter.
     */
    var addSyntaxHighlighting = function() {
        $(".language-c\\# .highlight").removeClass("highlight").addClass("cshighlight");
    }

    /**
     * Wrap each header group into a <section>. If a <section> already exists right after the
     * header tag, wrap it into that <section> (as a workaround for Markdown not working inside an
     * HTML tag.)
     * @param {string|jQuery} headerSelector - A jQuery selector matching the headers to convert into sections.
     */
    var prepareSections = function(headerSelector) {
        $(headerSelector).each(function() {
            // get header
            var header = $(this);
            var headerTagName = header.get(0).tagName;

            // get or create <section> after header
            var section = header.next("section");
            if (!section.length)
                section = $("<section></section>", { id: header.attr("id") }).insertAfter(header);

            // add metadata
            section.attr("data-name", header.text());
            section.attr("data-level", headerTagName.substr(1));
            header.removeAttr("id"); // avoid conflict with section
            header.attr("data-id", section.attr("id"));

            // get section contents
            var contents = section.nextUntil(function() {
                var element = $(this);
                return element.is(headerSelector)
                    && element.get(0).tagName <= headerTagName; // everything up to the next equal or higher header
            });

            // wrap everything into <section>
            section.append(header);
            section.append(contents);
        });
    };

    /**
     * Get metadata for a hierarchy of <section> tags.
     * @param {string|jQuery} parents - The elements for which to build a hierarchy.
     * @returns {object[]}
     */
    var getSectionHierarchy = function(parents) {
        parents = $(parents);
        var hierarchy = [];

        for (var i = 0; i < parents.length; i++) {
            var parent = $(parents[i]);
            hierarchy.push({
                id: parent.attr("id"),
                text: parent.attr("data-name"),
                children: getSectionHierarchy(parent.children("section"))
            });
        }

        return hierarchy;
    };

    /**
     * Build a table of contents.
     * @param {object[]} hierarchy - The section metadata hierarchy returned by {@see getSectionHierarchy}.
     * @returns {jQuery|null}
     */
    var getTableOfContents = function(hierarchy) {
        if (!hierarchy || !hierarchy.length)
            return null;

        var list = $("<ul></ul>");
        for(var i = 0; i < hierarchy.length; i++) {
            var entry = hierarchy[i];

            list.append($("<li></li>",
            {
                append: [
                    $("<a></a>", { href: "#" + entry.id, text: entry.text }),
                    getTableOfContents(entry.children)
                ]
            }));
        }
        return list;
    };


    /*********
    ** Initialise
    *********/
    addSyntaxHighlighting();
    prepareSections("h2, h3");

    var sectionHierarchy = getSectionHierarchy($("#content").children("section"));
    $("#toc").append(getTableOfContents(sectionHierarchy));
})();

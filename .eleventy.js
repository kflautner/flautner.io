module.exports = function (eleventyConfig) {
  // Copy static assets straight through to the output folder
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("CNAME");

  // Newest-first collection of essays
  eleventyConfig.addCollection("essays", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/essays/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Base64 encode a string (used to keep the email out of the raw HTML)
  eleventyConfig.addFilter("b64", (s) => Buffer.from(String(s)).toString("base64"));

  // Pretty date filter, e.g. "3 July 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

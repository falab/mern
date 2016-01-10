this["Thezanke"] = this["Thezanke"] || {};
this["Thezanke"]["templates"] = this["Thezanke"]["templates"] || {};
this["Thezanke"]["templates"]["firstTemlate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div>\n  This is a "
    + this.escapeExpression(((helper = (helper = helpers.word || (depth0 != null ? depth0.word : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"word","hash":{},"data":data}) : helper)))
    + "\n</div>\n";
},"useData":true});
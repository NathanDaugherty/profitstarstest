# BannoBootstrap 3 Template Project - Version 2.0

BannoBootstrap 3 is a group of files used as a starting point for developing a website on the Banno CMS. The README file contains the do's and dont's of building a website.

## Recent Updates
- Site structure set up so that bootstrap modifications are custom child elements, so that Bootstrap could be upgrade in the future without changing the look of the custom design.
- Script file has been streamlined and slimmed down for better performance.
- Created mustache “blocks” for commonly used elements like accordions, tabs, sliders, subAds, etc.
- Accordions have built in common features like + -, ADA stuff, etc.
- NPM project can easily be updated by running “npm update” and will upgrade all modules and plugins.
- Javascript plugins are set up correctly so they can be installed and updated with one command.
- Project should run easily always using the latest version of node.
- NPM modules that were deprecate and contained security flaws have been upgrade or replaced.
- Removed inline javascript from footer that sets the date because using document.write is a deprecated javascript method. This is now set in the main javascript file.
- animate.css library installed by default.
- All variables, colors, and components are set in the main.scss file and over-writable in the “custom” folder without modifying the core bootstrap files.
- All text editor type using .content class editable in one file, type.scss
- Removed redundant slick classes.
- Moved .keypress functions to the “non-cms” only scripts to prevent accordions with button role from being un-editable in the CMS because you cannot use the space bar.
- Contains built in pixel to rem gulp tasks, eliminating the need for inline pixel conversions.
- $(".loader") scripts for preloading images with animated loading icons
- Simplified the Disclaimer set to eliminate the need for 4 different messages.
- .screener class and getScreenSize function allows you to write custom javascript that is based on the set screen size.
- Fixed blocks with missing NODE_ENV!='production' tags that contain &lt;banno&gt; tags, removing duplicate code in production.
- Added custom Parsley validations, eliminating the need to edit source code.
    - use data-parsley-phone, data-parsley-zip, data-parsley-date instead of built in data-parsley-type=
- Added example of custom parsley error message container for radio elements on contact form.
- Added example code for captcha so it can be easily inserted into form and styled as if it were production.
- Added video banner support for both &lt;video&gt; embeds and YouTube videos for full width background videos.
- segmented scss files and partial mustaches files to match one another for easy location.



### Do's
- Updates to core styles need to be created under the /scss/custom folder using the same name (i.e. if editing \_navs.scss, create a file called "navs.scss" under the custom folder and add it to the main.scss file as an import. Never, ever edit the core files.
- Install plugins using the "npm install ..." command and reference the node_module in the gulpfile's "plugins" task. This will copy the appropriate files to your project's /plugins folder and then can be added too your scripts.mustache file as a file reference.
- Use the latest version of Node.js always. If your project does not compile and you are using the latest version that is not part of this project, the project will be updated, not your computer.

### Dont's
- Don't use any class on the &lt;body&gt; tag that will effect the CMS ex. .table.
- Don't remove classes currently on the &lt;body&gt; class as they might be there for a specific reason.
- Don't edit the Bootstrap core files, like, ever.

## Hidden Content Areas
- Add the class .hidden-content to any tag that you want hidden.
- As long as no text or image is inside of that div, the div will be removed from the DOM completely on load.

**HTML**

	<div class="hidden-content">
		// Empty div
	</div>

## Slider
- [SlickJS](http://kenwheeler.github.io/slick/)

**HTML**
HTML can be found under /templates/blocks/hero-slider.mustache and editable under /scss/sections/home.scss

## Tables
- The CMS creates a table with a class of "table" (&lt;table class="table"&gt;&lt;/table&gt; and options for "table-bordered" and "table-striped")

**HTML**

	<table class="table">
    <thead>
      <tr>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
      </tr>
    </thead>
		<tbody>
			<tr>
				<td>1</td>
				<td>1</td>
				<td>1</td>
				<td>1</td>
			</tr>
			<tr>
				<td>2</td>
				<td>2</td>
				<td>2</td>
				<td>2</td>
			</tr>
			<tr>
				<td>3</td>
				<td>3</td>
				<td>3</td>
				<td>3</td>
			</tr>
			<tr>
				<td>4</td>
				<td>4</td>
				<td>4</td>
				<td>4</td>
			</tr>
		</tbody>
	</table>


## Accordions
HTML can be found under /templates/blocks/accordion.mustache and editable under /scss/custom/accordion.scss

## Tabs	
HTML can be found under /templates/blocks/tabs.mustache and editable under /scss/custom/tabs.scss

## Modals
HTML can be found under /templates/blocks/modals.mustache and editable under /scss/custom/modals.scss


	

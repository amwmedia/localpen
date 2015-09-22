module.exports = function (plop) {
    plop.setGenerator('localpen', {
        description: 'local codepen project',
        prompts: [
            {
                type: 'input',
                name: 'title',
                message: 'title:',
                validate: function (txt) {
                    if (txt.length > 0) { return true; }
                    return 'LocalPen title is required.';
                }
            }, {
                type: 'input',
                name: 'description',
                message: 'description:'
            }, {
                type: 'confirm',
                name: 'babel',
                message: 'include babel transpiler:',
                default: false
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'localpen-{{ dashCase title }}/src/index.html',
                templateFile: 'plop-templates/localpen/index.html'
            }, {
                type: 'add',
                path: 'localpen-{{ dashCase title }}/src/logic.js',
                templateFile: 'plop-templates/localpen/logic.js'
            }, {
                type: 'add',
                path: 'localpen-{{ dashCase title }}/src/styles.styl',
                templateFile: 'plop-templates/localpen/styles.styl'
            }, {
                type: 'add',
                path: 'localpen-{{ dashCase title }}/package.json',
                templateFile: 'plop-templates/localpen/package.json'
            }, {
                type: 'add',
                path: 'localpen-{{ dashCase title }}/gulpfile.js',
                templateFile: 'plop-templates/localpen/gulpfile.js'
            }
        ]
    });
};

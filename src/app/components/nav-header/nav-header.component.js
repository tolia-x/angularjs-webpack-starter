import './nav-header.component.scss';

class NavHeaderController
{
    constructor()
    {
        'ngInject'
    }
}

export const NavHeaderComponent = {
    template: require('./nav-header.component.html'),
    controller: NavHeaderController,
    controllerAs: 'navHeader'
};
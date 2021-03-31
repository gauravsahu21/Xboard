import homePage from '../pages/homePage'

describe('Search', () => {
    beforeEach(() => {
        homePage.goto()
    })

    it('Should have at least one accordian in place', () => {
      let allAccordianButtons = homePage.allAccordianButtons();
      homePage.allAccordianButtons().should('have.length.of.at.least', 1)
    })

    it('Verify that first accordian is visible on page load', () => {
      homePage.firstAccordianButton().then(btn => {
        let dataTarget;
        if (btn.attr('data-target')) {
          dataTarget = btn.attr('data-target')
        } else {
          dataTarget = btn.attr('data-bs-target');
        }
        let targetDiv = homePage.getElement(dataTarget);
        targetDiv.should('to.be.visible');
      });
    })

    it('Verify that first accordian collapses when you click on button', () => {
      homePage.firstAccordianButton().then(btn => {
        let dataTarget;
        if (btn.attr('data-target')) {
          dataTarget = btn.attr('data-target')
        } else {
          dataTarget = btn.attr('data-bs-target');
        }
        let targetDiv = homePage.getElement(dataTarget);
        targetDiv.should('to.be.visible');
        homePage.firstAccordianButton().click().then(() => {
            let targetDivNew = homePage.getElement(dataTarget);
            targetDivNew.should('not.to.be.visible');
        })
      });
    })

    it('Verify first accordian exists', () => {
      homePage.firstAccordian().should('to.be.visible');
    })

    it.only('Click On Carousel and make sure that it changes the image', () => {
        homePage.firstAccordianButton().then(btn => {
            let dataTarget;
            if (btn.attr('data-target')) {
                dataTarget = btn.attr('data-target')
            } else {
                dataTarget = btn.attr('data-bs-target');
            }
            homePage.firstAccordianButton().click();
            cy.wait(1000);
            homePage.firstAccordianButton().click();
            cy.wait(1000);
            homePage.getElement(dataTarget)
                .within(() => {
                    cy.get('.carousel-item.active img')
                        .its(0)
                        .then(img => {
                            let src = img.attr('src');
                            cy.log(src).then(() => {
                                cy.get('.carousel-control-next-icon').its(0).invoke('css', '5px solid red');
                                cy.get('.carousel-control-next-icon').click();
                                cy.wait(1000);
                                cy.log("Try to get an element with .carousel class inside " + dataTarget);
                                cy.get('.carousel').scrollIntoView().type('{rightarrow}');
                                cy.wait(1000);
                                cy.get('.carousel').scrollIntoView().type('{rightarrow}');
                                cy.get('.carousel-item.active img').its(0)
                                    .invoke('attr', 'src')
                                    .should('not.to.be.equal', src);

                            });
                        });
                })
        });
    })

    it('Verify that each carousel has 10 cards', () => {
        homePage.allAccordianButtons().each(btn => {
            let dataTarget;
            if (btn.attr('data-target')) {
                dataTarget = btn.attr('data-target')
            } else {
                dataTarget = btn.attr('data-bs-target');
            }
            homePage.getElement(dataTarget + " > .card")
                .should('to.have.length.of', 10);
        });
    })

    it('Verify that each carousel-item contains one link followed by an image', () => {
        homePage.allAccordianButtons().each(btn => {
            let dataTarget;
            if (btn.attr('data-target')) {
                dataTarget = btn.attr('data-target')
            } else {
                dataTarget = btn.attr('data-bs-target');
            }
            homePage.getElement(dataTarget + " > .card a img")
                .should('to.have.length.of', 10);
        });
    })

    it('pickup the image that refers to thehindi.com and check its href also refers tp the same website.', () => {
        homePage.allAccordianButtons().each(btn => {
            let dataTarget;
            if (btn.attr('data-target')) {
                dataTarget = btn.attr('data-target')
            } else {
                dataTarget = btn.attr('data-bs-target');
            }
            homePage.getElement(dataTarget + ' a[href="https://sportstar.thehindu.com/cricket/ipl/ipl-news/rcb-vs-mi-royal-challengers-bangalore-vs-mumbai-indians-ipl-2020-live-score-streaming-updates/article32963056.ece"] ' +
                'img[src="https://sportstar.thehindu.com/cricket/article32963052.ece/ALTERNATES/LANDSCAPE_590/0U5A4805-copy"]')
                .should('to.have.length.of', 1);
        });
    })

})


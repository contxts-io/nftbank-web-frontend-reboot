import Home from './page';
describe('<Home />', () => {
  it('should render and display expected content', () => {
    // About 페이지를 위한 React 컴포넌트를 마운트합니다
    cy.mount(<Home />);

    // 새로운 페이지는 "About page"라는 h1 요소를 포함해야 합니다
    cy.get('h1').contains('Next.js + TypeScript');

    // 예상된 URL을 가진 링크가 존재하는지 확인합니다
    // *링크를* 따라가는 것은 E2E 테스트에 더 적합합니다
    cy.get('a[href="/about"]').should('be.visible');
  });
});

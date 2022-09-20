describe('HomePage', () => {
    it('Renders correctly', () => {
      cy.visit('http://localhost:3001');
    });
  
    it('Renders correctly', () => {
      cy.visit('http://localhost:3001');
    });
  });

  describe('checking the diffrent-2 end points', () => {
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/post');
    });
    
    it('Renders correctly', () => {
      cy.visit('http://localhost:3001/friends');
    });

    it('Renders correctly', () => {
      cy.visit('http://localhost:3001/chat');
    });
  });

  describe('checking perticular post page view', () => {
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/post/62e7577480f41ddf7d571790');
    });

    it('Renders correctly', () => {
      cy.visit('http://localhost:3001/post/62e10854b0dc1f77ef43efbb');
    });

    it('Renders correctly', () => {
      cy.visit('http://localhost:3001/post/62e23776b5b32bc18d4508e3');
    });
  });

  describe('checking perticular chat page view', () => {
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/chat/62da435b2f26086dc5f15e5c');
    });
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/chat/62da43832f26086dc5f15e80');
    });
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/chat/62da44352f26086dc5f15f66');
    });
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/chat/62e4c29d941df1c73921121f');
    });
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/chat/62e0eabce4b2e654b9eb6146');
    });
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/chat/62dd18c39826599ba21bdda4');
    });
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/chat/62dbb50ab5c48ff10ad633cd');
    });
  });

  describe('sign in page', () => {
    it('renders correctly', () => {
      cy.visit('http://localhost:3001//auth/login');
    });
  });
  
  describe('Register page', () => {
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/auth/signup');
    });
  });

  describe('profile page', () => {
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/user');
    });
  });

  describe('Edit profile page', () => {
    it('renders correctly', () => {
      cy.visit('http://localhost:3001/user/edit');
    });
  });

  // describe('Edit profile page', () => {
  //   it('renders correctly', () => {
  //     cy.visit('http://localhost:3001/user/edit');
  //   });
  // });


  
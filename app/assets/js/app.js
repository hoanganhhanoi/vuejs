Vue.http.options.root = '/root';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

var nav = new Vue({
  el: '#fake-nav',
  methods: {
    open: function(which, e) {
      // Prevents clicking the link from doing anything
      e.preventDefault();
      if (modal.active !== null) {
        $('#form-' + modal.active).removeClass('active');
        $('#' + modal.active + '-form').removeClass('active');
      }

      $('#login-modal').addClass('active');
      $('#form-' + which).addClass('active');
      $('#' + which + '-form').addClass('active');

      modal.active = which;
    }
  }
});

var modal_submit_register = 'Register';
var modal_submit_password = 'Reset Password';
var modal_submit_login = 'Login';

var modal = new Vue({  
  el: '#login-modal',
  data: {

    //Buntton text
    registerSubmit: modal_submit_register,
    passwordSubmit: modal_submit_password,
    loginSubmit: modal_submit_login,

    // Modal text fields
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    loginUser: '',
    loginPassword: '',
    passwordEmail: '',

    // Modal error messages
    registerError: '',
    loginError: '',
    passwordError: ''

  },
  methods: {
    close: function(e) {
      e.preventDefault();
      if (e.target === this.$el) {
        $('#login-modal').removeClass('active');
        this.$set('registerSubmit', modal_submit_register);
        this.$set('loginSubmit', modal_submit_login);
        this.$set('passwordSubmit', modal_submit_password);
      }
    },
    flip: function(which, e) {
      e.preventDefault();
      if (which !== this.active) {
        $('#form-' + this.active).removeClass('active');
        $('#form-' + which).addClass('active');
        $('#' + which + '-form').addClass('active');
        $('#' + this.active + '-form').removeClass('active');

        this.active = which;

        this.$set('registerSubmit', modal_submit_register);
        this.$set('loginSubmit', modal_submit_login);
        this.$set('passwordSubmit', modal_submit_password);
      }
    },
    submit: function(which, e) {
      username = "hoanganh";
      password = "123";
      e.preventDefault();

      if(modal[which + 'Lock'] === true) return;
      this[which + 'Lock'] = true;
      $('#' + which + 'Submit').addClass('disabled');
      var data = { form: which };

      switch(which) {
        case 'register':
          data.name = this.registerName;
          data.email = this.registerEmail;
          data.password = this.registerPassword;
          this.$set('registerSubmit', 'Registering.....');
          this.$set('registerMessage', 'Register successful...');
          break;
        case 'login':
          data.user = this.loginUser;
          data.password = this.loginPassword;
          this.$set('loginSubmit', 'Logging in......');
          if(data.user == "")
            this.$set('loginMessage', 'Username is not empty');
          if(data.password == "")
            this.$set('loginMessage', 'Password is not empty');
          if(data.user == "" && data.password == "")
            this.$set('loginMessage', 'Username and password are not empty');
          else {
            if(data.user == username && data.password == password)
              this.$set('loginMessage', 'Loggin successful...');
            else 
              this.$set('loginMessage', 'Login not successful...');
          }
          break;
        case 'password':
          data.email = this.passwordEmail;
          if(data.email == "" || data.email == null) 
            this.$set('passwordMessage', 'Email is not empty.');
          else {
            this.$set('passwordSubmit', 'Resetting Password...');
            this.$set('passwordMessage', 'Check mail reset password');
          }
          break;

        case 'testapi':
          this.$http.get("http://192.168.25.131:3000/api/users") 
            .then(function(response) {
              console.log(response.data);
            });
          break;

        case 'calllogin':

          break;
      }
    }
  }
});
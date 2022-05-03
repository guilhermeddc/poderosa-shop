export const getErrorString = (code: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Seu e-mail é inválido.';
    case 'auth/email-already-exists':
      return 'O e-mail fornecido já está em uso por outro usuário.';
    case 'auth/invalid-credential':
      return 'Seu e-mail é inválido.';
    case 'auth/wrong-password':
      return 'A senha é inválida ou o usuário não possui uma senha.';
    case 'auth/invalid-password':
      return 'Sua senha está incorreta.';
    case 'auth/user-not-found':
      return 'Não há usuário com este e-mail.';
    case 'auth/operation-not-allowed':
      return 'Operação não permitida.';

    default:
      return 'Um erro indefinido ocorreu.';
  }
};

import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import api from '../../services/api';

import {
  Container,
  Title,
  BackToSigninButton,
  BackToSigninButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignup = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        Alert.alert(
          'Usuario criado com sucesso',
          'Seu usuário foi criado com sucesso, você já pode realizar login na aplicação.',
        );

        navigation.navigate('Signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          Alert.alert(
            'Erro na criação',
            'Ocorreu um erro ao criar um usuário, verifique os dados inseridos',
          );
        }
      }
    },
    [navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Crie sua conta</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignup}>
            <Input
              autoCorrect
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef}
              autoCorrect={false}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="Email"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              returnKeyType="send"
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Senha"
              textContentType="newPassword"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Button onPress={() => formRef.current?.submitForm()}>Criar</Button>
          </Form>
        </Container>
        <BackToSigninButton onPress={() => navigation.navigate('Signin')}>
          <Icon name="arrow-left" size={20} color="#ff9000" />
          <BackToSigninButtonText>Voltar para login</BackToSigninButtonText>
        </BackToSigninButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

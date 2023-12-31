import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../Styles/Componentes';
import VerificarAparelhagem from '../Componentes/TeorUmidade/VerificarAparelhagem';
import Passo1 from '../Componentes/TeorUmidade/Passo1';
import Passo2 from '../Componentes/TeorUmidade/Passo2';
import { ScrollView } from 'react-native';
import Passo3 from '../Componentes/TeorUmidade/Passo3';
import Passo4 from '../Componentes/TeorUmidade/Passo4';
import Passo5 from '../Componentes/TeorUmidade/Passo5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalSalvarEnsaio from '../Componentes/ModalSalvarEnsaio';
import { AparelhagemTU } from '../FakeDB/Aparelhagem';
import { usePassosConcluidos } from '../Context/ResultadosContext';
import { useNavigation } from '@react-navigation/native';
import { authScreenProp } from './Granulometria';


const TeorUmidade: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const swiperRef = useRef<Swiper>(null);
    const navigation = useNavigation<authScreenProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const [isFinalStep, setIsFinalStep] = useState(false);
    const { preparacaoAmostraConcluido, setPassoConcluido } = usePassosConcluidos()

    const [nomeEnsaio, setNomeEnsaio] = useState('');

    const handleNextPage = () => {
        if (swiperRef.current) {
            const nextPage = page + 1;
            if (nextPage < 6) {
                swiperRef.current.scrollBy(1);
                setPage(nextPage);
                if (nextPage === 5) {
                    setIsFinalStep(true);
                } else {
                    setIsFinalStep(false);
                }
            }
        }
    };

    const backToGranulometri = () => {
        setPassoConcluido('teorUmidade')
        navigation.navigate('Granulometria')
    }

    const handleFinishTeorUmidade = () => {
        if (isFinalStep) {
            preparacaoAmostraConcluido
                ? backToGranulometri()
                : setModalVisible(true);
        } else {
            handleNextPage();
        }
    };


    return (
        <KeyboardAwareScrollView
            style={{
                flex: 1,
                marginBottom: 10,
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
        >
            <View>
                <Text style={{ textAlign: 'center' }}>NBR 6457 de 03/2016</Text>
                <Text style={{ textAlign: 'center', padding: 10 }}>
                    Amostras de Solo - Preparação para Ensaios de Compactação e Ensaios de Caracterização
                </Text>
            </View>
            <Swiper
                ref={swiperRef}
                loop={false}
                style={{ maxHeight: 700 }}
                showsPagination={true}
                dotStyle={{ backgroundColor: '#D9D9D9', width: 10, height: 10 }}
                activeDotStyle={{ backgroundColor: '#A8B444', width: 10, height: 10 }}
                paginationStyle={{ bottom: 10, alignItems: 'center' }}
                onIndexChanged={(index) => setPage(index)}
            >
                <VerificarAparelhagem initialCheckBoxes={AparelhagemTU} />
                <Passo1 />
                <ScrollView>
                    <Passo2 />
                </ScrollView>
                <Passo3 />
                <Passo4 />
                <Passo5 />
            </Swiper>
            <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity style={styles.ensaioContainer} onPress={handleFinishTeorUmidade}>
                    <Text style={styles.ensaioConteinerText}>
                        {isFinalStep ? 'Finalizar Teor de Umidade' : 'Próximo Passo'}
                    </Text>
                    <Image style={styles.imgSeta} source={require('../Styles/imagens/seta.png')} />
                </TouchableOpacity>
            </View>
            <ModalSalvarEnsaio
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </KeyboardAwareScrollView>
    );
};

export default TeorUmidade;

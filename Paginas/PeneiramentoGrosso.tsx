import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../Styles/Componentes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import VerificarAparelhagem from '../Componentes/TeorUmidade/VerificarAparelhagem';
import { PGAparelhagem } from '../FakeDB/Aparelhagem';
import { authScreenProp } from './Granulometria';
import { useNavigation } from '@react-navigation/native';
import Passo1PG from '../Componentes/Granulometria/PeneiramentoGrosso/Passo1PG';
import Passo2PG from '../Componentes/Granulometria/PeneiramentoGrosso/Passo2PG';
import Passo3PG from '../Componentes/Granulometria/PeneiramentoGrosso/Passo3PG';
import Passo4PG from '../Componentes/Granulometria/PeneiramentoGrosso/Passo4PG';
import { usePassosConcluidos } from '../Context/ResultadosContext';

const PeneiramentoGrosso: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const swiperRef = useRef<Swiper>(null);
    const navigation = useNavigation<authScreenProp>();
    const [isFinalStep, setIsFinalStep] = useState(false);
    const { setPassoConcluido } = usePassosConcluidos()


    const handleNextPage = () => {
        if (swiperRef.current) {
            const nextPage = page + 1;
            if (nextPage < 5) {
                swiperRef.current.scrollBy(1);
                setPage(nextPage);
                if (nextPage === 4) {
                    setIsFinalStep(true);
                } else {
                    setIsFinalStep(false);
                }
            }
        }
    };

    const handleFinishPreparation = () => {
        if (isFinalStep) {
            setPassoConcluido('peneiramentoGrosso')
            navigation.navigate('Granulometria');
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
            contentContainerStyle={{ flexGrow: 1, padding: 10 }}
            enableOnAndroid={true}
        >
            <View>
                <Text style={{ textAlign: 'center' }}>NBR 7181 de 2016</Text>
                <Text style={{ textAlign: 'center', padding: 10 }}>
                    Solo - Análise Granulométrica
                </Text>
            </View>
            <Swiper
                ref={swiperRef}
                loop={false}
                style={{ maxHeight: 600 }}
                showsPagination={true}
                dotStyle={{ backgroundColor: '#D9D9D9', width: 5, height: 5 }}
                activeDotStyle={{ backgroundColor: '#A8B444', width: 10, height: 10 }}
                paginationStyle={{ bottom: 10, alignItems: 'center' }}
                onIndexChanged={(index) => setPage(index)}
            >
                <VerificarAparelhagem initialCheckBoxes={PGAparelhagem} />
                <Passo1PG />
                <Passo2PG />
                <Passo3PG />
                <Passo4PG />
            </Swiper>
            <View style={{ alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }}>
                <TouchableOpacity style={styles.ensaioContainer} onPress={handleFinishPreparation}>
                    <Text style={styles.ensaioConteinerText}>
                        {isFinalStep ? 'Finalizar Preparação' : 'Próximo Passo'}
                    </Text>
                    <Image style={styles.imgSeta} source={require('../Styles/imagens/seta.png')} />
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default PeneiramentoGrosso;

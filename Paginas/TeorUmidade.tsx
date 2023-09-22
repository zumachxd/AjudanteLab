import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../Styles/Componentes';
import VerificarAparelhagem from '../Componentes/TeorUmidade/VerificarAparelhagem';
import Passo1 from '../Componentes/TeorUmidade/Passo1';

const TeorUmidade: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const swiperRef = useRef<Swiper>(null);
    const [dadosPasso1, setDadosPasso1] = useState({ massa1: '', massa2: '', massa3: '' });

    const handleNextPage = () => {
        if (swiperRef.current) {
            const nextPage = page + 1;
            if (nextPage < 3) {
                swiperRef.current.scrollBy(1);
                setPage(nextPage);
            }
        }
    };

    return (
        <SafeAreaView style={styles.containerHome}>
            <Text style={{ textAlign: 'center' }}>NBR 6457 de 03/2016</Text>
            <Text style={{ textAlign: 'center' }}>
                Amostras de Solo - Preparação para Ensaios de Compactação e Ensaios de Caracterização
            </Text>
            <Swiper
                ref={swiperRef}
                loop={false}
                showsPagination={true}
                dotStyle={{ backgroundColor: '#D9D9D9', width: 10, height: 10 }}
                activeDotStyle={{ backgroundColor: '#A8B444', width: 10, height: 10 }}
                paginationStyle={{ bottom: 10 }}
                onIndexChanged={(index) => setPage(index)}
            >
                <VerificarAparelhagem />
                <Passo1 setDadosPasso1={setDadosPasso1} />
                <View>
                    <Text>{dadosPasso1.massa1}</Text>
                </View>
            </Swiper>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity style={styles.ensaioContainer} onPress={handleNextPage}>
                    <Text style={styles.ensaioConteinerText}>Próximo Passo</Text>
                    <Image style={styles.imgSeta} source={require('../Styles/imagens/seta.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TeorUmidade;

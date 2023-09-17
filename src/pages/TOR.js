import {View, Text, ScrollView, Box} from 'native-base';
import React from 'react';

const PrivacyPolicyScreen = () => {
  return (
    <View flex={1}>
      <Box backgroundColor={'lime.900'} alignItems={'center'} p={4}>
        <Text color={'white'} fontSize={20} fontWeight={'bold'}>
          Kebijakan & Privasi
        </Text>
      </Box>
      <ScrollView showsVerticalScrollIndicator={false} p={4}>
        <Text>
          Selamat datang di Aplikasi Pulang Bersama. Aplikasi Pulang Bersama
          merupakan aplikasi yang dioperasikan dibawah yayasan Pondok Pesantren
          Nurul Jadid. Kami sangat menghargai kepercayaan Anda dalam menggunakan
          layanan kami.
        </Text>
        <Text>
          Halaman ini memberikan penjelasan kepada Anda mengenai kebijakan
          privasi kami yang dirancang untuk membantu Anda memahami bagaimana
          kami mengumpulkan, menggunakan, dan menjaga informasi data pribadi
          yang kami dapat dari aplikasi Pulang Bersama untuk yayasan Pondok
          Pesantren Nurul Jadid.
        </Text>
        <Text>
          Kami menggunakan data Anda untuk menyajikan dan memperbaiki layanan
          aplikasi. Dengan menggunakan layanan aplikasi ini berarti Anda telah
          setuju atas pengumpulan dan penggunaan informasi yang tertuang didalam
          kebijakan privasi pada layanan aplikasi ini. Selain itu, penggunaan
          istilah yang digunakan "Kebijakan Privasi" ini memiliki arti yang sama
          seperti "Syarat dan Ketentuan" kami.
        </Text>
        <Text fontSize={16} fontWeight={'bold'} mt={8} mb={4}>
          JENIS DATA YANG DIKUMPULKAN
        </Text>
        <Text>Informasi Pribadi</Text>
        <Text>
          Pada saat menggunakan layanan aplikasi ini, kami akan meminta Anda
          untuk memberikan beberapa informasi data pribadi Anda yang akan kami
          gunakan untuk mengidentifikasi dan menghubungi Anda. Kami dapat
          mengumpulkan informasi pribadi seperti nama, tanggal lahir, alamat,
          nomor telepon, alamat email, dan informasi lainnya.
        </Text>
        <Text>Informasi Perjalanan</Text>
        <Text>
          Aplikasi kami akan mengumpulkan informasi tentang status kepulangan,
          dropspot kepulangan, jadwal perjalanan, pendamping perjalanan, tarif
          perjalanan, dan lokasi keberangkatan Anda saat menggunakan layanan
          kami.
        </Text>
        <Text>Informasi Penggunaan</Text>
        <Text>
          Kami dapat mengumpulkan informasi tentang cara Anda berinteraksi
          menggunakan layanan ini atau mengakses Aplikasi Pulang Bersama melalui
          perangkat seluler Anda. Kami dapat mengumpulkan informasi secara
          otomatis seperti alamat IP Address, sistem operasi yang Anda gunakan,
          ID unik perangkat Anda, tanggal dan waktu penggunaan, fitur yang
          digunakan, serta data diagnostik lainnya.
        </Text>
        <Text>Cookies</Text>
        <Text>
          Cookie adalah file data kecil yang biasanya terdiri dari huruf dan
          angka yang ditempatkan browser pada perangkat internet Anda. Dengan
          cookie, fitur aplikasi/situs web yang Anda akses dapat menyimpan
          informasi atau mengingat tindakan dan preferensi Anda dari waktu ke
          waktu. Sebagian besar browser internet mendukung cookie, namun Anda
          dapat mengatur browser yang Anda gunakan untuk menolak beberapa jenis
          cookie tertentu atau cookie spesifik. Disamping itu, Anda dapat
          menghapus cookie kapan saja. Kami menggunakan cookie untuk berbagai
          tujuan, seperti untuk mengingat preferensi penelusuran aman Anda,
          membantu Anda untuk menggunakan dan mengelola layanan, dan melindungi
          data Anda.
        </Text>
        <Text fontSize={16} fontWeight={'bold'} mt={8} mb={4}>
          CARA KAMI MENGGUNAKAN INFORMASI ANDA
        </Text>
        <Text>
          Kami menggunakan informasi yang Anda berikan untuk menyediakan layanan
          pulang bersama sesuai dengan permintaan Anda.
        </Text>
        <Text>
          Kami dapat menggunakan informasi untuk meningkatkan layanan kami,
          melakukan analisis data, dan memahami kebutuhan dan preferensi
          pengguna.
        </Text>
        <Text>
          Informasi yang kami kumpulkan dapat digunakan untuk menghubungi Anda
          terkait pembaruan layanan, informasi penting, dan promosi terkait
          Aplikasi.
        </Text>
        <Text fontSize={16} fontWeight={'bold'} mt={8} mb={4}>
          IZIN PERANGKAT PADA APLIKASI SELULER (ANDROID/IOS)
        </Text>
        <Text>
          Pada aplikasi mobile dibutuhkan izin penggunaan perangkat diantaranya:
        </Text>
        <Text>
          - Izin kamera yang digunakan untuk Upload gambar, video, dan audio.
        </Text>
        <Text>
          - Izin media penyimpanan (read/write) dimana ini terkait lanjutan izin
          kamera untuk kepentingan Upload.
        </Text>
        <Text>
          - Izin penggunaan NFC yang digunakan untuk mendeteksi kartu identitas
          aplikasi.
        </Text>
        <Text>
          - Izin lokasi yang dibutuhkan untuk sistem reservasi dan presensi
          kehadiran.
        </Text>
        <Text fontSize={16} fontWeight={'bold'} mt={8} mb={4}>
          KEAMANAN DATA
        </Text>
        <Text>
          Keamanan informasi data pribadi Anda adalah hal yang sangat penting
          bagi kami. Kami mengambil langkah-langkah keamanan yang sesuai untuk
          melindungi informasi pribadi Anda dari akses, penggunaan, atau
          pengelolaan yang tidak sah. Yayasan Pondok Pesantren Nurul Jadid
          memastikan bahwa informasi yang dikumpulkan akan disimpan dengan aman.
          Kami menggunakan enkripsi untuk melindungi informasi pribadi Anda saat
          ditransmisikan melalui jaringan. Namun harap diketahui bahwa mengenai
          transmisi data (jaringan komputer/internet) atau metode penyimpanan
          elektronik yang Anda gunakan, kami juga tidak dapat memastikan
          benar-benar seratus persen aman secara absolut. Meskipun demikian,
          kami berusaha untuk selalu melindungi data pribadi Anda.
        </Text>
        <Text fontSize={16} fontWeight={'bold'} mt={8} mb={4}>
          UNGKAPAN INFORMASI
        </Text>
        <Text>
          - Kami tidak akan menjual, menyewakan, atau menukar informasi pribadi
          Anda kepada pihak ketiga tanpa izin Anda, kecuali diperlukan oleh
          hukum.
        </Text>
        <Text>
          - Kami dapat mengungkapkan informasi kepada penyedia layanan pihak
          ketiga yang membantu kami dalam menjalankan layanan, dengan ketentuan
          bahwa mereka menjaga kerahasiaan informasi tersebut.
        </Text>
        <Text fontSize={16} fontWeight={'bold'} mt={8} mb={4}>
          PERUBAHAN PADA KEBIJAKAN PRIVASI
        </Text>
        <Text>
          Kami dapat memperbaharui Kebijakan Privasi ini dari waktu ke waktu.
          Pembaharuan atas kebijakan privasi ini akan dipublikasikan pada
          aplikasi/website ini. Oleh karenanya, kami menghimbau Anda untuk
          mengakses aplikasi/website ini secara berkala atas informasi terkini
          untuk layanan Aplikasi Pulang Bersama.
        </Text>
        <Text fontSize={16} fontWeight={'bold'} mt={8} mb={4}>
          HUBUNGI KAMI
        </Text>
        <Text mb={8}>
          Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau
          mengenai ketidakpuasan Anda dengan cara kami menangani pertanyaan atau
          keluhan. Anda dapat menghubungi kami melalui kontak kami di
          @puber.nuruljadid.io.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

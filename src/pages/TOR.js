import {StyleSheet} from 'react-native';
import {View, Text, ScrollView, Box} from 'native-base';
import React from 'react';

const PrivacyPolicyScreen = () => {
  return (
    <View flex={1}>
      <Box backgroundColor={'lime.900'} alignItems={'center'} p={4}>
        <Text color={'white'} fontSize={20} fontWeight={'bold'}>
          Privacy Policy
        </Text>
      </Box>
      <ScrollView showsVerticalScrollIndicator={false} p={4}>
        <Text style={style.text}>
          Mohon anda membaca kebijakan privasi ini dengan seksama untuk
          memastikan bahwa anda memahami bagaimana Pondok Pesantren Nurul Jadid
          mengumpulkan, menyimpan, menggunakan, mengungkapkan dan melindungi
          informasi pribadi anda yang diperoleh melalui aplikasi Pulang Bersama.
        </Text>
        <Text style={style.text}>
          Jika anda menggunakan aplikasi dan layanan kami, anda akan tunduk dan
          menyetujui kebijakan privasi ini serta syarat dan ketentuan penggunaan
          layanan kami.
        </Text>
        <Text style={style.head}>Definisi</Text>
        <Text style={style.text}>
          <Text style={style.show}>Aplikasi</Text> berarti aplikasi Pulang
          Bersama yang dibuat dan dikembangkan oleh Pondok Pesantren Nurul Jadid
          untuk membantu manjemen data pendidikan.{' '}
        </Text>
        <Text style={style.text}>
          <Text style={style.show}>Informasi Pribadi</Text> berarti data
          perseorangan/perusahaan tertentu yang melekat dan dapat diidentifikasi
          pada suatu individu/perusahaan yang dikumpulkan melalui aplikasi,
          seperti nama, alamat, data dan dokumen identitas perusahaan (apabila
          anda bukan seorang individu), nomor telepon, alamat surat elektronik
          (e-mail), nomor rekening bank, perizinan dan/atau sejenisnya, dan
          informasi lain yang mungkin dapat mengidentifikasi anda sebagai
          pengguna aplikasi.
        </Text>
        <Text style={style.text}>
          <Text style={style.show}>Nurul Jadid</Text> berarti Pondok Pesantren
          Nurul Jadid, suatu lembaga yang didirikan berdasarkan hukum negara
          republik indonesia untuk selanjutnya dalam hal ini disebut dengan
          “kami”.
        </Text>
        <Text style={style.text}>
          <Text style={style.show}>Ketentuan penggunaan</Text> berarti ketentuan
          yang memiliki arti sama dengan syarat dan ketentuan atau prosedur
          standar operasi atau ketentuan lainnya yang dapat diakses pada
          aplikasi sehubungan dengan masing-masing aplikasi yang dikembangkan
          oleh kami, sebagaimana dapat diubah atau ditambah dari waktu ke waktu
        </Text>
        <Text style={style.text}>
          <Text style={style.show}>Layanan</Text> berarti hal-hal yang
          ditawarkan oleh kami melalui aplikasi kepada anda.
        </Text>
        <Text style={style.head}>
          Pemberian dan Pemanfaatan Informasi Pribadi
        </Text>
        <Text style={style.text}>
          Saat anda menggunakan aplikasi, kami mungkin meminta anda untuk
          memberikan informasi pribadi tertentu supaya aplikasi dapat
          menjalankan fungsinya, namun tidak terbatas pada penyimpanan,
          penggunaan, pemrosesan, pemberian dan pengalihan informasi pribadi
          anda oleh kami, penggunaan informasi pribadi dalam mengakses akun anda
          untuk verifikasi kepemilikan atas akun anda, memberikan layanan kepada
          anda, menjawab pertanyaan-pertanyaan dan permintaan-permintaan yang
          anda ajukan kepada kami, memberikan anda informasi mengenai aplikasi
          dan layananan kami dan membantu kami mendeteksi, mencegah, mengurangi
          dan menyelidiki aktivitas curang atau ilegal pada aplikasi kami.
          Selain itu, pemberian informasi pribadi anda dapat diberikan secara
          langsung (sebagai contoh, saat anda mendaftar sebagai pengguna
          aplikasi) kepada kami melalui pihak ketiga (lembaga/institusi).
        </Text>
        <Text style={style.head}>Penyedia Jasa</Text>
        <Text style={style.text}>
          Kami dapat bekerja sama dengan perusahaan pihak ketiga karena alasan
          berikut:
        </Text>
        <Text>- memfasilitasi aplikasi dan layanan atas nama kami</Text>
        <Text>- melakukan layanan terkait aplikasi kami</Text>
        <Text>
          - membantu kami dalam menganalisis bagaimana aplikasi dan layanan kami
          digunakan.
        </Text>
        <Text style={style.text}>
          Pihak ketiga memiliki akses ke informasi pribadi anda untuk melakukan
          tugas yang diberikan kepada mereka atas nama kami dan berkewajiban
          untuk tidak mengungkapkan atau menggunakan informasi untuk tujuan lain
          apa pun
        </Text>
        <Text style={style.head}>Perlindungan Data dan Informasi Pribadi</Text>
        <Text style={style.text}>
          Kami menyimpan informasi pribadi anda pada server yang berlokasi di
          indonesia. Kami bekerja dengan pihak ketiga untuk menyediakan berbagai
          layanan terkait teknologi. Data anda secara aman disimpan dan tidak
          digunakan untuk kepentingan apapun selain pengembangan aplikasi
          seperti dijelaskan dalam kebijakan privasi maupun syarat dan ketentuan
          kami. Kepercayaan anda dalam memberikan informasi pribadi anda kepada
          kami adalah tanggung jawab kami. Kami akan memberlakukan
          langkah-langkah untuk melindungi dan mengamankan data dan informasi
          pribadi anda. Namun demikian, perlu diingat bahwa tidak ada metode
          transmisi melalui internet atau metode penyimpanan elektronik yang
          sepenuhnya aman, jadi kami tidak dapat sepenuhnya menjamin bahwa
          sistem kami tidak akan diakses oleh virus, malware, gangguan atau
          kejadian luar biasa termasuk akses oleh pihak ketiga yang tidak
          berwenang. Anda harus menjaga keamanan dan kerahasiaan data yang
          berkaitan dengan akun anda pada aplikasi termasuk kata sandi dan
          data-data lainnya yang anda berikan di dalam aplikasi ini.
        </Text>
        <Text style={style.head}>Perubahan Kebijakan Privasi</Text>
        <Text style={style.text}>
          Kami mungkin akan memperbarui kebijakan privasi dan ketentuan
          penggunaan secara berkala. Oleh karena itu, kami menyarankan anda
          meninjau halaman ini secara berkala untuk setiap perubahan. Kami akan
          memberitahu anda tentang perubahan dengan memposting kebijakan privasi
          baru di halaman ini.
        </Text>
        <Text style={style.head}>Kontak Kami</Text>
        <Text style={style.text} pb={5}>
          Jika anda memiliki keraguan atau pertanyaan tentang kebijakan privasi
          ini, anda dapat menghubungi kami melalui email
          sekretariat.nj@gmail.com atau telephone di nomor 0888- 307-70777. Jika
          anda tidak setuju atau tidak dapat menerima praktik apapun yang
          diuraikan dalam kebijakan privasi ini, mohon disampaikan agar kami
          dapat meningkatkan kualitas layanan.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    marginVertical: 8,
    lineHeight: 25,
    textAlign: 'justify',
  },
  head: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  show: {
    fontWeight: 'bold',
  },
});

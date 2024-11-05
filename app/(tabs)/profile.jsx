import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { signOut } from "../../lib/appwrite";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView>
          <View>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              laboriosam vero expedita obcaecati non quia ipsum ullam mollitia
              maxime voluptates nostrum provident iusto, officiis assumenda
              maiores numquam sit magni impedit natus quod, quo laborum qui.
              Vel, inventore cum unde totam praesentium facere iusto enim,
              doloribus debitis officiis error magnam ipsam magni cumque tempore
              eum ducimus nulla eaque vitae corrupti! Excepturi dolorum,
              voluptatum explicabo quae eos voluptate quia fugit! Perferendis,
              tenetur assumenda dicta laudantium omnis sint magnam iusto dolore,
              libero maiores quam quo impedit consequatur quae, sit rerum!
              Soluta assumenda accusantium modi minima esse qui porro aspernatur
              fuga maxime aperiam amet unde, consequuntur error? Odit fugit
              ullam exercitationem aliquid maxime, provident nam deleniti
              maiores neque. Soluta facere hic quo consequatur delectus ipsam ad
              odio. Expedita tenetur perferendis nemo iste velit vero officia
              voluptates, beatae ducimus adipisci porro tempora temporibus
              consectetur ex suscipit commodi saepe recusandae sint id tempore!
              Quas laborum voluptatum alias culpa tenetur explicabo animi
              repellendus atque esse? Quisquam, explicabo eligendi. Error optio
              dicta sed iste asperiores eveniet ullam facilis dolorem veniam
              quia illum quaerat expedita, nihil quibusdam, iusto earum!
              Voluptate voluptas labore perspiciatis nostrum nam quaerat
              consequuntur dolore ratione odit cupiditate quo consequatur alias,
              reiciendis quasi accusantium error aperiam, a aspernatur aliquid
              cum. Est quas iure, dicta provident, rem amet a sapiente facere
              aut, voluptates vel possimus. Porro hic, debitis mollitia quae
              nesciunt iure quibusdam voluptatibus unde similique, rem ducimus
              amet nobis eveniet illo tempore! Quo quam tenetur ex! Neque,
              saepe. Eum culpa repellat minima obcaecati blanditiis dolor illum
              in praesentium, atque nesciunt quasi! Quasi laborum porro,
              architecto, rem modi quas ea similique, natus tenetur laudantium
              tempore. Reprehenderit maxime illo et voluptas. Fugiat aliquam
              animi corporis itaque, minima eveniet sed accusantium voluptatem
              nostrum obcaecati fugit, ipsa natus placeat deleniti laudantium
              totam. Et nulla sapiente delectus soluta, at totam cumque ullam?
              Molestiae laborum unde corrupti ea. Labore quibusdam cum fuga
              voluptatum sit, molestias harum recusandae quo beatae error
              repellat, reiciendis deserunt aspernatur nobis quae tenetur
              doloremque et, asperiores eligendi! Dicta eveniet quod animi,
              inventore sed iste fugiat architecto voluptatum maiores illo. Illo
              ut voluptates inventore voluptatem! Mollitia voluptate,
              consequatur ipsum incidunt minus nesciunt, similique, nam facere
              laborum vero recusandae quas eaque et molestias facilis cum culpa?
              Quam, nesciunt quo! Dolorem placeat deserunt deleniti cupiditate
              libero voluptatum aperiam soluta ut ratione quaerat! Porro dolorum
              tempora magnam voluptatem doloremque quod necessitatibus
              perferendis perspiciatis iste esse sint hic nesciunt impedit,
              repudiandae eveniet laboriosam nam deserunt ab et magni quis
              incidunt, suscipit corrupti numquam? Animi a blanditiis reiciendis
              nihil ex, harum ad esse provident, dolorum repudiandae neque quasi
              facilis. Nobis delectus, explicabo recusandae sed nisi ea dicta
              tenetur quam, omnis dignissimos sit. Placeat aperiam eaque itaque
              necessitatibus fuga? Nisi vel non minus facere voluptates
              voluptatum harum officiis, ipsum nesciunt omnis dolore aliquam
              aspernatur, quibusdam, commodi a. Similique ex architecto
              cupiditate maxime ducimus nesciunt possimus, cum iure, omnis magni
              tenetur quasi? Totam, error consequuntur quod, alias voluptate
              culpa rerum omnis rem fugit et odio veniam repellendus dignissimos
              soluta doloribus, minus ullam necessitatibus iure nihil
              asperiores?
            </Text>
            <TouchableOpacity onPress={signOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;
